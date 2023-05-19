CREATE TABLE books(
    book_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    pages INT,
    start_date VARCHAR(255),
    end_date VARCHAR(255),
    notes TEXT,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);