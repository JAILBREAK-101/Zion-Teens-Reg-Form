#include <mysql_driver.h>
#include <mysql_connection.h>
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/prepared_statement.h>
#include <cppconn/resultset.h>
#include <iostream>
#include <string>
#include <ctime>

class RegistryBackend {
public:
    RegistryBackend(const std::string& dbHost, const std::string& dbUser, const std::string& dbPass, const std::string& dbName) {
        driver = get_driver_instance();
        conn = driver->connect(dbHost, dbUser, dbPass);
        conn->setSchema(dbName);
    }

    ~RegistryBackend() {
        delete conn;
    }

    // Register a new user
    bool registerUser(const std::string& username, const std::string& password) {
        try {
            sql::PreparedStatement* pstmt = conn->prepareStatement("INSERT INTO users (username, password) VALUES (?, ?)");
            pstmt->setString(1, username);
            pstmt->setString(2, password);
            pstmt->execute();
            delete pstmt;
            return true;
        } catch (sql::SQLException& e) {
            std::cerr << "SQL error in registerUser: " << e.what() << std::endl;
            return false;
        }
    }

    // Login a user
    bool loginUser(const std::string& username, const std::string& password) {
        try {
            sql::PreparedStatement* pstmt = conn->prepareStatement("SELECT password FROM users WHERE username = ?");
            pstmt->setString(1, username);
            sql::ResultSet* res = pstmt->executeQuery();

            if (res->next()) {
                bool success = (res->getString("password") == password);
                delete res;
                delete pstmt;
                return success;
            } else {
                delete res;
                delete pstmt;
                return false;
            }
        } catch (sql::SQLException& e) {
            std::cerr << "SQL error in loginUser: " << e.what() << std::endl;
            return false;
        }
    }

    // Check-in for Sunday
    bool checkIn(const std::string& username) {
        try {
            // Check if today is Sunday
            time_t now = time(0);
            struct tm tstruct = *localtime(&now);
            if (tstruct.tm_wday != 0) {
                std::cerr << "Check-in is allowed only on Sundays" << std::endl;
                return false;
            }

            sql::PreparedStatement* pstmt = conn->prepareStatement("UPDATE users SET checkedIn = TRUE, lastCheckIn = NOW() WHERE username = ?");
            pstmt->setString(1, username);
            pstmt->executeUpdate();
            delete pstmt;
            return true;
        } catch (sql::SQLException& e) {
            std::cerr << "SQL error in checkIn: " << e.what() << std::endl;
            return false;
        }
    }

private:
    sql::Driver* driver;
    sql::Connection* conn;
};

// Function to interact with HTML front end
void handleClientRequest(const std::string& action, const std::string& username, const std::string& password) {
    // Database credentials (adjust as needed)
    std::string dbHost = "tcp://127.0.0.1:3306";
    std::string dbUser = "root";
    std::string dbPass = "password";
    std::string dbName = "registry";

    RegistryBackend backend(dbHost, dbUser, dbPass, dbName);

    if (action == "register") {
        if (backend.registerUser(username, password)) {
            std::cout << "User registered successfully!" << std::endl;
        } else {
            std::cout << "Registration failed." << std::endl;
        }
    } else if (action == "login") {
        if (backend.loginUser(username, password)) {
            std::cout << "Login successful!" << std::endl;
        } else {
            std::cout << "Invalid username or password." << std::endl;
        }
    } else if (action == "checkin") {
        if (backend.checkIn(username)) {
            std::cout << "Check-in successful!" << std::endl;
        } else {
            std::cout << "Check-in failed. Ensure it’s Sunday." << std::endl;
        }
    } else {
        std::cout << "Invalid action requested." << std::endl;
    }
}

int main() {
    std::string action, username, password;
    std::cout << "Enter action (register, login, checkin): ";
    std::cin >> action;
    std::cout << "Enter username: ";
    std::cin >> username;
    std::cout << "Enter password: ";
    std::cin >> password;

    handleClientRequest(action, username, password);

    return 0;
}