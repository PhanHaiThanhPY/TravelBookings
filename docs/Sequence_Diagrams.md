# Sequence Diagrams

## Room Type Management Process

```mermaid
sequenceDiagram
    participant A as Admin
    participant API as API Server
    participant DB as Database
    participant Cache as Cache Layer

    A->>API: Create Room Type
    API->>API: Validate Input
    API->>DB: Save Room Type
    DB-->>API: Confirm Save
    API->>Cache: Invalidate Cache
    API-->>A: Return Room Type Details

    A->>API: Update Room Type
    API->>DB: Check Existence
    DB-->>API: Return Status
    API->>DB: Update Room Type
    DB-->>API: Confirm Update
    API->>Cache: Invalidate Cache
    API-->>A: Return Updated Details

    A->>API: Delete Room Type
    API->>DB: Check Associated Rooms
    DB-->>API: Return Dependencies
    API->>DB: Delete if No Dependencies
    DB-->>API: Confirm Delete
    API->>Cache: Invalidate Cache
    API-->>A: Return Status
```

## Room Booking Process

```mermaid
sequenceDiagram
    participant U as User
    participant API as API Server
    participant DB as Database
    participant P as Payment Gateway
    participant N as Notification Service

    U->>API: Search Available Rooms
    API->>DB: Query Availability
    DB-->>API: Return Available Rooms
    API-->>U: Display Room Options

    U->>API: Select Room & Dates
    API->>DB: Check Real-time Availability
    DB-->>API: Confirm Availability
    API->>DB: Create Temporary Hold
    API-->>U: Show Booking Summary

    U->>API: Confirm Booking
    API->>P: Process Payment
    P-->>API: Payment Status

    alt Payment Successful
        API->>DB: Confirm Booking
        API->>N: Send Confirmation
        N-->>U: Booking Confirmation
    else Payment Failed
        API->>DB: Release Room Hold
        API-->>U: Payment Error
    end
```

## Room Management Process

```mermaid
sequenceDiagram
    participant A as Admin
    participant API as API Server
    participant DB as Database
    participant RT as Room Type Service

    A->>API: Create Room
    API->>RT: Validate Room Type
    RT-->>API: Room Type Details
    API->>DB: Save Room
    DB-->>API: Confirm Save
    API-->>A: Return Room Details

    A->>API: Update Room Status
    API->>DB: Check Current Status
    DB-->>API: Return Status
    API->>DB: Update Status
    DB-->>API: Confirm Update
    API-->>A: Return Updated Details

    A->>API: Delete Room
    API->>DB: Check Active Bookings
    DB-->>API: Return Bookings
    API->>DB: Delete if No Bookings
    DB-->>API: Confirm Delete
    API-->>A: Return Status
```

## Process Descriptions

### Room Type Management

1. **Creation Process**

   - Admin submits room type details
   - System validates input data
   - Saves to database
   - Invalidates cache
   - Returns confirmation

2. **Update Process**

   - Admin provides updated details
   - System checks existence
   - Updates database
   - Invalidates cache
   - Returns updated information

3. **Deletion Process**
   - Admin requests deletion
   - System checks for associated rooms
   - Prevents deletion if rooms exist
   - Deletes if no dependencies
   - Updates cache

### Room Booking

1. **Search Phase**

   - User searches for rooms
   - System queries database
   - Returns available options
   - Shows pricing and details

2. **Reservation Phase**

   - User selects room and dates
   - System checks real-time availability
   - Creates temporary hold
   - Shows booking summary

3. **Confirmation Phase**
   - User confirms booking
   - System processes payment
   - Creates booking record
   - Sends confirmation

### Room Management

1. **Room Creation**

   - Admin provides room details
   - System validates room type
   - Creates room record
   - Associates with room type

2. **Status Updates**

   - Admin updates room status
   - System checks current status
   - Updates if valid
   - Returns confirmation

3. **Room Deletion**
   - Admin requests deletion
   - System checks for active bookings
   - Prevents deletion if booked
   - Deletes if available

## Error Handling

1. **Validation Errors**

   - Input validation failures
   - Missing required fields
   - Invalid data formats

2. **Business Logic Errors**

   - Room type deletion with existing rooms
   - Room deletion with active bookings
   - Double booking prevention

3. **System Errors**
   - Database connection issues
   - Cache invalidation failures
   - Payment processing errors

## Security Considerations

1. **Authentication**

   - Admin operations require valid token
   - User operations require authentication
   - Token validation on each request

2. **Authorization**

   - Role-based access control
   - Operation-level permissions
   - Resource ownership validation

3. **Data Protection**
   - Sensitive data encryption
   - Secure payment processing
   - Audit logging
