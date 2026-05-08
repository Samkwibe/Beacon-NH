-- Beacon NH — run once against your MySQL database (8+ recommended)
CREATE TABLE IF NOT EXISTS events (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(512) NOT NULL,
  `desc` TEXT NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(512) NOT NULL DEFAULT 'TBD',
  category VARCHAR(64) NOT NULL DEFAULT 'Community',
  img VARCHAR(1024) NOT NULL DEFAULT '',
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_events_date (event_date)
);

CREATE TABLE IF NOT EXISTS rsvps (
  id CHAR(36) PRIMARY KEY,
  event_id CHAR(36) NOT NULL,
  event_title VARCHAR(512) NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(320) NOT NULL DEFAULT '',
  phone VARCHAR(64) NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_rsvps_created (created_at),
  CONSTRAINT fk_rsvps_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
