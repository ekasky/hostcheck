SHOW DATABASES;
USE hostcheck;

CREATE TABLE User (
    id CHAR(36) NOT NULL PRIMARY KEY, 
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    provider ENUM('local', 'google') NOT NULL DEFAULT 'local',
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    googleId VARCHAR(255) UNIQUE,
    googleToken VARCHAR(255),
    profileImage VARCHAR(255),
    twoFaEnabled BOOLEAN DEFAULT FALSE,
    twoFaSecret VARCHAR(255),
    twoFaVerified BOOLEAN DEFAULT FALSE,
    twoFaBackupCodes JSON,
    passwordResetToken VARCHAR(255),
    passwordResetTokenExpires DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

