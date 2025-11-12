## HW Socket - Leeson-11
Using cursor IDE - try to implement in the chatRooms a new capability to manage rooms,
only close existing room and logout the relevant users


# Connect RMQ to our api
1. API will produce a message to send email to admin ( consumer should console.log email sent to admin with the data)
2. every time that a new room created with F word it will send a notification to the admin
3. api -> connect to rmq -> publish message -> consumer: email_service 