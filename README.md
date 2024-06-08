# Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup project](#setup-project)
* [Functional Requirements](#functional-requirements)
* [Aplication preview](#aplication-preview)
  
# General info
### The System Supporting the Organization of Skydiving
This engineering work presents a web application that has a full set of functionalities to support the organization of skydiving. The system is designed to facilitate service opportunities for customers, streamline the execution of work for customer service and administrators.

# Technologies
React | Express | Node.js | MySQL

# Setup project
1. Clone repository.
2. Create database with name `skydive` and run the [code from the file.](skrypt_baza.sql)
3. Setup and run the server site:
   - go to the `/backend` path, then install the necessary dependencies:
    ```
    npm i
    ```
    - launch the server:
    ```
    npm start
    ```

4. Setup and run the client site:
   - go to the `/frontend` path, then install the necessary dependencies:
    ```
    npm i
    ```
    - launch the client:
    ```
    npm start
    ```


# Functional Requirements
#### Functions of a non-logged-in user:
- registration and log in,
- check the current offer of the company,
- check free dates for parachute jumps.


#### Functionality of the logged-in user (client):
- possibility to book an appointment, by filling out the form: (selecting the available date and time, choosing the type of jump, entering the weight, choosing the method of payment),
- preview, edit or cancel reserved appointments,
- preview, edit your own personal data,
- send and recieve messages,
- log out and delete account.


#### Employee functionalities:
- scheduling jump dates,
- confirmation of payment,
- managing the offer (adding, modifying, deleting),
- planning the schedule of booked jumps,
- cancelling jumps and sending out information to customers,
- customer data management (setting up customer accounts, recording customer licenses),
- send and recieve messages.


#### Administrator functionalities:
- management of user accounts (create, edit, delete), 
- ability to manage user roles,
- viewing of financial summary, 
- locking accounts and unlocking accounts.


# Aplication preview
### Registration for the application
![Register](images/register.png)

### Offer - available types of skydive jumps
![Offer](images/offer.png)

### Review and selection of jump date
![Reservation](images/reservation.png)

### Booking a date for a skydive jump
![Reservation2](images/reservation_2.png)

### Jump booking details
![Reservation_details](images/reservation_details.png)

### Edit booking date
![Change_reservation](images/change_reservation.png)

### Viewing and editing user data
![Edit_user_data](images/edit_user_data.png)

### Management of the jump offer by the employee
![Planing_jump_date](images/planing_jump_date.png)

![Delete_jump_date](images/delete_jump_date.png)
