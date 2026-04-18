-- 1. Insert Users First (Independent)
INSERT INTO "User" (user_id, kyc_status) VALUES 
(1, 'VERIFIED'), 
(2, 'PENDING'),
(3, 'VERIFIED');

-- 2. Insert Vehicles (Depends on User)
INSERT INTO Vehicle (vehicle_id, make, battery_capacity, user_id) VALUES 
(1001, 'Tata Nexon EV', 30.2, 1),
(1002, 'MG ZS EV', 50.3, 2),
(1003, 'Hyundai IONIQ 5', 72.6, 3);

-- 3. Insert Discoms (Independent)
INSERT INTO Discom (discom_id, discom_name) VALUES 
(101, 'Tata Power DDL'), 
(102, 'BSES Rajdhani Power');

-- 4. Insert Transformers (Independent)
INSERT INTO Transformer (transformer_id, capacity_kva, feeder_name) VALUES 
(501, 500.0, 'Connaught Place Main Feeder'),
(502, 1000.0, 'South Ex Grid Station');

-- 5. Insert Charging Stations (Depends on Discom and Transformer)
INSERT INTO Charging_Station (station_id, operator_name, latitude, longitude, discom_id, transformer_id) VALUES 
(10, 'GreenCharge Nexus', 28.631500, 77.216700, 101, 501),
(11, 'Zeon FastHub', 28.567700, 77.225300, 102, 502);

-- 6. Insert Connectors (Depends on Charging_Station)
INSERT INTO Connector (connector_id, connector_type, max_power_kw, status_id, station_id) VALUES 
(201, 'CCS2', 50.0, 'AVAILABLE', 10),
(202, 'Type 2 AC', 22.0, 'IN_USE', 10),
(203, 'CHAdeMO', 60.0, 'AVAILABLE', 11),
(204, 'CCS2', 120.0, 'OFFLINE', 11);

-- 7. Insert Charging Sessions (Depends on Vehicle and Connector)
-- Session 3001 is completed, Session 3002 is currently active (null end_time)
INSERT INTO Charging_Session (session_id, start_time, end_time, total_kwh_delivered, vehicle_id, connector_id) VALUES 
(3001, '2026-04-18 08:30:00', '2026-04-18 09:45:00', 18.5, 1001, 201),
(3002, '2026-04-18 16:00:00', NULL, NULL, 1002, 202);

-- 8. Insert Payments (Depends on completed Charging_Session)
INSERT INTO Payment (payment_id, session_id, amount, payment_method) VALUES 
(4001, 3001, 370.00, 'UPI');

-- 9. Insert Energy Meters (Depends on Charging_Station)
INSERT INTO Energy_Meter (meter_id, station_id) VALUES 
(8001, 10),
(8002, 11);

-- 10. Insert Tariff Plans (Depends on Charging_Station)
INSERT INTO Tariff_Plan (plan_id, station_id, price_per_kwh, tod_windows) VALUES 
(9001, 10, 20.00, '08:00-22:00 Peak, 15 Rs Off-Peak'),
(9002, 11, 25.50, 'Standard 24x7 Fast Charging');

-- 11. Insert Maintenance Tickets (Depends on Charging_Station)
-- Ticket 7001 is open, Ticket 7002 is resolved
INSERT INTO Maintenance_Ticket (ticket_id, station_id, issue_desc, opened_time, closed_time) VALUES 
(7001, 11, 'Connector 204 screen is broken', '2026-04-18 10:00:00', NULL),
(7002, 10, 'Network connectivity dropout', '2026-04-17 14:00:00', '2026-04-17 18:30:00');
