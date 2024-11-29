<?php
// DB connection
$servername = "localhost"; // Your DB server
$username = "root"; // Your DB username
$password = ""; // Your DB password (empty for local server)
$dbname = "user_data"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name'], $_POST['email'], $_POST['password'])) {
    // Get form data
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);  // You should hash passwords in real-world apps

    // Basic validation
    if (empty($name) || empty($email) || empty($password)) {
        $response = array(
            "status" => "error",
            "message" => "All fields are required."
        );
    } else {
        // Insert data into database
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            // Success response
            $response = array(
                "status" => "success",
                "message" => "User registered successfully!",
                "data" => array("name" => $name, "email" => $email)
            );
        } else {
            // Error response
            $response = array(
                "status" => "error",
                "message" => "Error: " . $conn->error
            );
        }
    }
    
    // Close connection
    $conn->close();

    // Send response as JSON
    echo json_encode($response);
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request."));
}
?>
