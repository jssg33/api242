/**
 * @swagger
 * components:
 *   schemas:
 *     GCParkAuthor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         displayName:
 *           type: string
 *         fullName:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *
 *     GCParkReview:
 *       type: object
 *       properties:
 *         author:
 *           $ref: '#/components/schemas/GCParkAuthor'
 *         rating:
 *           type: number
 *         dateWritten:
 *           type: string
 *         dateVisited:
 *           type: string
 *         review:
 *           type: string
 *
 *     GCPark:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         parkName:
 *           type: string
 *         location:
 *           type: string
 *         description:
 *           type: string
 *         adultPrice:
 *           type: number
 *         childPrice:
 *           type: number
 *         someLat:
 *           type: number
 *         someLong:
 *           type: number
 *         parkId:
 *           type: number
 *         imageUrl:
 *           type: string
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GCParkReview'
 *       example:
 *         id: 1
 *         parkName: "Adventure Park"
 *         location: "123 Forest Lane"
 *         description: "A beautiful outdoor adventure park."
 *         adultPrice: 25
 *         childPrice: 10
 *         someLat: 34.12345
 *         someLong: -81.23456
 *         parkId: 101
 *         imageUrl: "https://example.com/park.jpg"
 *         reviews:
 *           - author:
 *               id: "user123"
 *               displayName: "JohnD"
 *               fullName: "John Doe"
 *               dateOfBirth: "1990-01-01"
 *             rating: 5
 *             dateWritten: "2026-01-10"
 *             dateVisited: "2025-12-20"
 *             review: "Amazing park with great trails!"
 */

/**
 * @swagger
 * /api/GCPARKS:
 *   get:
 *     summary: Returns the GC PARKS DTO (Parks + Embedded Reviews)
 *     tags: [GCPARKS]
 *     responses:
 *       200:
 *         description: A list of GC PARKS DTO objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GCPark'
 */
