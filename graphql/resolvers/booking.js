const Event = require("../../models/event")
const Booking = require("../../models/booking")
const { transformBooking, transformEvent } = require("./merge")

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized")
    }
    try {
      const bookings = await Booking.find({ user: req.userId })
      return bookings.map((booking) => transformBooking(booking))
    } catch (error) {
      throw error
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized")
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId })
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
    })
    const result = await booking.save()
    return transformBooking(result)
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized")
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event")
      const cancelledEvent = transformEvent(booking.event)

      await Booking.deleteOne({ _id: args.bookingId })

      return cancelledEvent
    } catch (error) {
      throw error
    }
  },
}
