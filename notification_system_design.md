# Notification System Design

## Priority Logic
Placement > Event > Result

## Flow
1. Fetch notifications from API
2. Sort based on priority
3. Return top 10

## Scalability
- Can use queue (Kafka)
- Can use caching (Redis)

## Notes
- No DB used as per instructions
