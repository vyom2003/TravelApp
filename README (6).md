# Travel Planner Application # Team 13

This Travel Planner Application is designed to provide a comprehensive solution for trip planning, integrating functionalities like user registration, hotel booking, itinerary generation, travel partner matching, and real-time weather alerts.

## Getting Started

These instructions will guide you on setting up the project on your local machine for development and testing purposes.

### Prerequisites

- Python 3.x
- Node.js and npm
- MySQL or another relational database system

## Services

- **BuddyService**: Manages partner matching and related functionalities.
- **HotelBooking**: Handles all hotel booking operations.
- **HotelSearch**: Provides hotel searching capabilities.
- **PaymentService**: Manages all payment transactions.
- **TravelItineraryService**: Handles creation and management of travel itineraries.
- **UserService**: Manages user information and authentication.
- **WeatherUpdatesService**: Provides weather updates relevant to the user's travel plans.

## Directory Structure

```plaintext
.
├── BuddyService
│   ├── app
│   │   ├── models
│   │   │   └── PartnerModel.py
│   │   └── routes
│   │       └── SearchRoute.py
│   └── run.py
├── HotelBooking
│   ├── app
│   │   ├── models
│   │   │   └── BookingModel.py
│   │   └── routes
│   │       └── BookingRoute.py
│   └── run.py
├── HotelSearch
│   ├── app
│   │   └── routes
│   │       └── Search.py
│   └── run.py
├── PaymentService
│   ├── app
│   │   ├── models
│   │   │   ├── CreditCard.py
│   │   │   └── Upi.py
│   │   ├── resources
│   │   │   ├── CreditCardStrategy.py
│   │   │   ├── PaymentResource.py
│   │   │   ├── PaymentStrategy.py
│   │   │   └── UpiStrategy.py
│   │   └── routes
│   │       └── PaymentRoute.py
│   └── run.py
├── TravelItineraryService
│   ├── app
│   │   └── routes
│   │       └── TravelItineraryRoute.py
│   └── run.py
├── UserService
│   ├── app
│   │   ├── models
│   │   │   └── UserModel.py
│   │   └── routes
│   │       ├── LoginRoute.py
│   │       └── UserRoute.py
│   └── run.py
└── WeatherUpdatesService
    ├── app
    │   ├── models
    │   │   └── SubscriberModel.py
    │   └── routes
    │       └── Publisher.py
    └── run.py

```
## Setup Instructions

### Running Backend Services

Each service within the project can be started using the following command format. Navigate to the desired service directory and run the service:

```bash
cd <folder_name>  # replace <folder_name> with the actual service directory name
python3 run.py
```

### Running the frontend service
```bash
cd frontend 
npm i
npm start
```

### Usage 
https://localhost:3000/


the website will start working
