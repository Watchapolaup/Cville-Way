# Set up the library
from operator import indexOf

from flask import Flask, jsonify, request, redirect, url_for,render_template
from dotenv import load_dotenv
import googlemaps
import os
import random


load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("Google Maps API missing! Check the README file to set up .env")


app = Flask(__name__)
gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
# creating a Flask app
@app.route("/")
def home():
    return "HOME"



#Getting the route and places
@app.route("/get_route",methods=['GET', 'POST'])
def get_route():
    #This part to get the inputs
    origin = request.args.get("origin") #input for the starting location
    destination = request.args.get("destination") #input for destination if input this cannot put distance
    theme = request.args.get("theme")
    distance_mi = request.args.get("distance")
    distance_m = 0


    #This part to check the validation of the input and converting some data
    if not origin or (not destination and not distance_mi):
        return jsonify({"error": "Missing required parameters"}), 400

    if not theme:
        theme = "Local Landmark"
    origin_place = gmaps.geocode(origin)
    if not origin_place:
        return jsonify({"error": "Invalid address/place name"}), 400
    origin_coords = origin_place[0]['geometry']['location']
    if distance_mi:
        try:
            distance_m = int(distance_mi) * 1609.3
        except ValueError:
            return jsonify({"error": "Distance must be valid mile."}), 400

    if destination:
        destination_place = gmaps.geocode(destination)
        if not destination_place:
            return jsonify({"error": "Invalid address/place name"}), 400
        destination_coords = destination_place[0]['geometry']['location']



    #Find nearby place with correct keyword and distance when the destination not inputted
    else:
        places = gmaps.places_nearby(origin_coords, distance_m,keyword=theme)
        if 'results' in places and places['results']:
            potential = []
            for place in places['results']:
                place_coords = place['geometry']['location']
                place_walk = gmaps.directions(origin_coords, place_coords, mode='walking')
                walking_dist = place_walk[0]['legs'][0]['distance']['value']
                if walking_dist > distance_m *0.75 and walking_dist < distance_m *1.25:
                    potential.append([place,walking_dist])
                if potential:
                    min = 100000
                    best = potential[0]
                    for i in potential:
                        if abs(i[1]-distance_m) < min:
                            min = abs(i[1]-distance_m)
                            best = i
                    destination = best[0]['name']
                    destination_coords = best[0]['geometry']['location']
                else:
                    return jsonify({"error": "No suitable destinations found"}), 404
        else:
            return jsonify({"error": "No locations found"}), 404




    route = gmaps.directions(origin_coords, destination_coords, mode="walking")
    new_dist_meters = route['rows'][0]['elements'][0]['distance']['value']
    if not route:
        return jsonify({"error": "Could not generate directions"}), 500
    total_distance = route[0]['legs'][0]['distance']['value']

    stop = []
    #Cut this first if fail
    # Add waypoints every 5 miles if total distance is at least 10 miles
    if total_distance >= 16093:  # 10 miles in meters
        num_stops = total_distance // 8046  # Stops every 5 miles
        distance_step = total_distance / (num_stops + 1)

        accumulated_distance = 0
        for leg in route[0]['legs']:
            for step in leg['steps']:
                accumulated_distance += step['distance']['value']
                if accumulated_distance >= distance_step:
                    step_location = step['end_location']

                    # Find a place near this step that matches the theme
                    nearby_places = gmaps.places_nearby(
                        location=step_location, radius=500, keyword=theme
                    )

                    if 'results' in nearby_places and nearby_places['results']:
                        stop.append(nearby_places['results'][0]['geometry']['location'])
                    else:
                        stop.append(step_location)  # Fallback to step location if no match

                    accumulated_distance = 0  # Reset for the next waypoint

    route = gmaps.directions(origin_coords, destination_coords, mode="walking", waypoints=stop)



    #Cut this second if fail
    if new_dist_meters < distance_m * 0.8:
        distance_left = distance_m - new_dist_meters
        new_dist_meters = distance_m
        distance_m = distance_left
        new_stop = gmaps.place_nearby(origin_coords, distance_m * 0.5,keyword=theme)
        if 'results' in new_stop and new_stop['results']:
            for nplace in new_stop['results']:
                nplace_coords = nplace['geometry']['location']
                check = gmaps.direction(origin_coords, nplace_coords, mode='walking')
                nplace_wdist = check['legs'][0]['distance']['value']
                dist_check = nplace_wdist - distance_m
                dist_to_dest = gmaps.direction(nplace_coords, destination_coords, mode='walking')['legs'][0]['distance']['value']
                if dist_check > dist_to_dest and dist_check*0.9 < dist_to_dest:
                    stop.append(nplace)
                    total_distance += dist_to_dest + nplace_wdist
                    distance_m = dist_to_dest

            if not stop:
                return jsonify({"error": "Could not generate directions"}), 500

        else:
            return jsonify({"error": "No locations found"}), 404


    route = gmaps.directions(origin_coords, destination_coords, mode="walking", waypoints=stop)
    if not route:
        return jsonify({"error": "Could not generate optimized route"}), 500

    route_info = route[0]['legs'][0]
    steps = [{
        "instruction": step['html_instructions'],
        "distance": f"{round(step['distance']['value'] / 1609.3, 2)} miles"
    } for step in route_info['steps']]

    return jsonify({
        "origin": origin,
        "destination": destination,
        "total_distance": f"{round(route_info['distance']['value'] / 1609.3, 2)} miles",
        "waypoints": stop,
        "steps": steps
    })


# driver func   tion
if __name__ == '__main__':
    app.run(debug=True)