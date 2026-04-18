CREATE TABLE Discom ( 
    discom_id INT PRIMARY KEY, 
    discom_name VARCHAR(100) NOT NULL UNIQUE 
); 

CREATE TABLE "User" ( 
    user_id INT PRIMARY KEY, 
    kyc_status VARCHAR(20) NOT NULL 
); 

CREATE TABLE Vehicle ( 
    vehicle_id INT PRIMARY KEY, 
    make VARCHAR(50) NOT NULL, 
    battery_capacity FLOAT NOT NULL, 
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) 
        ON DELETE CASCADE 
); 

CREATE TABLE Transformer ( 
    transformer_id INT PRIMARY KEY, 
    capacity_kva FLOAT NOT NULL, 
    feeder_name VARCHAR(100) NOT NULL 
); 

CREATE TABLE Charging_Station ( 
    station_id INT PRIMARY KEY, 
    operator_name VARCHAR(100) NOT NULL, 
    latitude DECIMAL(9,6) NOT NULL, 
    longitude DECIMAL(9,6) NOT NULL, 
    discom_id INT NOT NULL, 
    transformer_id INT NOT NULL, 
    FOREIGN KEY (discom_id) REFERENCES Discom(discom_id), 
    FOREIGN KEY (transformer_id) REFERENCES Transformer(transformer_id) 
); 

CREATE TABLE Connector ( 
    connector_id INT PRIMARY KEY, 
    connector_type VARCHAR(50) NOT NULL, 
    max_power_kw FLOAT NOT NULL, 
    status_id VARCHAR(20) NOT NULL, 
    station_id INT NOT NULL, 
    FOREIGN KEY (station_id) REFERENCES Charging_Station(station_id) 
        ON DELETE CASCADE 
); 

CREATE TABLE Charging_Session ( 
    session_id INT PRIMARY KEY, 
    start_time TIMESTAMP NOT NULL, 
    end_time TIMESTAMP, 
    total_kwh_delivered FLOAT CHECK (total_kwh_delivered >= 0), 
    vehicle_id INT NOT NULL, 
    connector_id INT NOT NULL, 
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle(vehicle_id), 
    FOREIGN KEY (connector_id) REFERENCES Connector(connector_id) 
); 

CREATE TABLE Payment ( 
    payment_id INT PRIMARY KEY, 
    session_id INT UNIQUE, 
    amount FLOAT NOT NULL CHECK (amount >= 0), 
    payment_method VARCHAR(50) NOT NULL, 
    FOREIGN KEY (session_id) REFERENCES Charging_Session(session_id) 
); 

CREATE TABLE Energy_Meter ( 
    meter_id INT PRIMARY KEY, 
    station_id INT NOT NULL, 
    FOREIGN KEY (station_id) REFERENCES Charging_Station(station_id) 
); 

CREATE TABLE Tariff_Plan ( 
    plan_id INT PRIMARY KEY, 
    station_id INT NOT NULL, 
    price_per_kwh FLOAT NOT NULL CHECK (price_per_kwh > 0), 
    tod_windows VARCHAR(100), 
    FOREIGN KEY (station_id) REFERENCES Charging_Station(station_id) 
); 

CREATE TABLE Maintenance_Ticket ( 
    ticket_id INT PRIMARY KEY, 
    station_id INT NOT NULL, 
    issue_desc TEXT NOT NULL, 
    opened_time TIMESTAMP NOT NULL, 
    closed_time TIMESTAMP, 
    FOREIGN KEY (station_id) REFERENCES Charging_Station(station_id) 
);
