INSERT INTO users (auth0_sub, name, nickname, email, role) VALUES
('auth0|sample1', 'Sachin Tendulkar', 'Sachin', 'sachin.tendulkar@example.com', 'admin'),
('auth0|sample2', 'Virat Kohli', 'Virat', 'virat.kohli@example.com', 'admin'),
('auth0|sample3', 'MS Dhoni', 'Dhoni', 'ms.dhoni@example.com', 'user'),
('auth0|sample4', 'Sourav Ganguly', 'Dada', 'sourav.ganguly@example.com', 'user'),
('auth0|sample5', 'Kapil Dev', 'Kapil', 'kapil.dev@example.com', 'user'),
('auth0|sample6', 'Rahul Dravid', 'The Wall', 'rahul.dravid@example.com', 'user'),
('auth0|sample7', 'Anil Kumble', 'Kumble', 'anil.kumble@example.com', 'user'),
('auth0|sample8', 'Yuvraj Singh', 'Yuvraj', 'yuvraj.singh@example.com', 'user');

INSERT INTO bugs (date_reported, description, priority, user_id, active) VALUES
('2026-04-20', 'Login page crashes on mobile devices', 'high', 1, true),
('2026-04-21', 'Dashboard widgets not loading data', 'high', 2, true),
('2026-04-22', 'Cannot assign multiple users to a bug', 'medium', 3, true),
('2026-04-23', 'Filter functionality not working properly', 'medium', 4, true),
('2026-04-24', 'Sort by date showing incorrect results', 'low', 5, false),
('2026-04-25', 'Missing validation in bug report form', 'high', 6, true),
('2026-04-26', 'Dark mode toggle not persisting', 'low', 7, true),
('2026-04-27', 'Performance issue on bugs listing page', 'medium', 8, true);

INSERT INTO users_bugs (user_id, bug_id) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);