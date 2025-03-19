# Class Diagram Documentation

## Core Entities

### RoomType

```mermaid
classDiagram
    class RoomType {
        +String id
        +String name
        +String description
        +Number basePrice
        +Number capacity
        +String[] amenities
        +String[] images
        +String status
        +Date createdAt
        +Date updatedAt
        +createRoomType()
        +updateRoomType()
        +deleteRoomType()
        +getRoomType()
        +listRoomTypes()
        +getRooms()
    }

    class Room {
        +String id
        +String roomTypeId
        +String number
        +Number floor
        +String wing
        +String status
        +String[] specialFeatures
        +Date createdAt
        +Date updatedAt
        +createRoom()
        +updateRoom()
        +deleteRoom()
        +getRoom()
        +listRooms()
        +checkAvailability()
    }

    class User {
        +String id
        +String name
        +String email
        +String phone
        +Object preferences
        +Date createdAt
        +Date updatedAt
        +register()
        +login()
        +updateProfile()
        +getProfile()
        +getBookings()
        +addToWishlist()
    }

    class Booking {
        +String id
        +String userId
        +String roomId
        +Date checkIn
        +Date checkOut
        +Number totalPrice
        +String status
        +Date createdAt
        +Date updatedAt
        +createBooking()
        +updateBooking()
        +cancelBooking()
        +getBooking()
        +calculatePrice()
    }

    class Payment {
        +String id
        +String bookingId
        +String userId
        +Number amount
        +String currency
        +String status
        +String paymentMethod
        +Date createdAt
        +processPayment()
        +refundPayment()
        +getPaymentStatus()
    }

    RoomType "1" -- "*" Room : contains
    Room "1" -- "*" Booking : has
    User "1" -- "*" Booking : makes
    Booking "1" -- "1" Payment : has
```

## Relationships

1. **RoomType - Room (1:Many)**

   - One RoomType can have multiple Rooms
   - Each Room belongs to exactly one RoomType

2. **Room - Booking (1:Many)**

   - One Room can have multiple Bookings (over time)
   - Each Booking is associated with exactly one Room

3. **User - Booking (1:Many)**

   - One User can have multiple Bookings
   - Each Booking belongs to exactly one User

4. **Booking - Payment (1:1)**
   - Each Booking has exactly one Payment
   - Each Payment is associated with exactly one Booking

## Key Methods

### RoomType

- CRUD operations for room types
- Ability to list associated rooms
- Price management

### Room

- CRUD operations for individual rooms
- Availability checking
- Status management

### User

- Authentication operations
- Profile management
- Booking history access
- Wishlist management

### Booking

- Reservation creation and management
- Price calculation
- Status updates

### Payment

- Payment processing
- Refund handling
- Transaction status tracking
