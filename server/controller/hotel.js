const Hotels = require("../model/hotel");
const Rooms = require("../model/room");
const Transactions = require("../model/transaction");
const Users = require("../model/user");
const { format } = require("date-fns");
exports.city = async (req, res, next) => {
  try {
    const hotels = await Hotels.find({});
    res.status(200).json({ hotels });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal SErver Error" });
  }
};

exports.hotelSearch = async (req, res, next) => {
  console.log(req.body);
  const { datePicker, room, city } = req.body.data;
  const roomUser = room;
  const startDate = new Date(datePicker[0].startDate);
  const endDate = new Date(datePicker[0].endDate);

  //lọc theo ngày tháng
  function filterRoom(array, startDate, endDate) {
    return array.filter((transaction) => {
      const transactionStartDate = new Date(transaction.startDate);
      const transactionEndDate = new Date(transaction.endDate);
      return !(
        startDate > transactionEndDate || endDate < transactionStartDate
      );
    });
  }
  try {
    //lấy tất cả số phòng theo khách sạn
    const hotels = await Hotels.find({ city: city })
      .populate("rooms", "roomNumbers")
      .exec();

    //tất cả các phòng
    const allRoom = hotels.map((hotel) => ({
      _id: hotel._id,
      rooms: hotel.rooms
        .map((room) => room.roomNumbers.map((item) => item + room._id))
        .flat(),
    }));
    //tất cả các giao dịch
    const roomArray = await Transactions.find();

    //nhung phong da chon trong datepicker
    const roomOccupied = filterRoom(roomArray, startDate, endDate)
      .map((transaction) => transaction.room)
      .flat();

    //những phòng trồng còn lại
    const roomEmpty = allRoom.map((room) => ({
      _id: room._id,
      roomOfNumber: room.rooms.filter((item) => !roomOccupied.includes(item))
        .length,
    }));

    //thêm số lượng phòng trống và lọc ra theo biến room
    const results = hotels
      .map((obj1) => {
        const matchedObj = roomEmpty.find(
          (obj2) => obj2._id.toString() === obj1._id.toString()
        );
        return { ...obj1, roomOfNumber: matchedObj?.roomOfNumber };
      })
      .filter((room) => room.roomOfNumber >= roomUser);

    res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error hotelSearch" });
  }
};

exports.hotelDetail = async (req, res, next) => {
  const { id } = req.body;
  try {
    const room = await Hotels.findOne({ _id: id });
    res.json({ room });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Interval server error" });
  }
};

exports.room = async (req, res, next) => {
  const { idRoom } = req.body;

  try {
    const rooms = await Rooms.find({ _id: { $in: idRoom } });
    res.json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.transaction = async (req, res, next) => {
  console.log(req.body);
  const {
    nameEntered,
    methodPayEntered,
    roomNumbers,
    datePicker,
    totalBill,
    hotelId,
    userId,
  } = req.body;

  try {
    const transaction = new Transactions({
      userId,
      user: nameEntered,
      hotel: hotelId,
      room: roomNumbers,
      startDate: datePicker[0].startDate,
      endDate: datePicker[0].endDate,
      price: totalBill,
      payment: methodPayEntered,
    });
    await transaction.save();

    return res.json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
};

exports.showRoom = async (req, res, next) => {
  const { datePicker, allRoomNumbers } = req.body;

  const startDate = new Date(datePicker[0].startDate);
  const endDate = new Date(datePicker[0].endDate);

  function filterRoom(array, startDate, endDate) {
    return array.filter((transaction) => {
      const transactionStartDate = new Date(transaction.startDate);
      const transactionEndDate = new Date(transaction.endDate);
      return !(
        startDate > transactionEndDate || endDate < transactionStartDate
      );
    });
  }
  try {
    const roomArray = await Transactions.find();
    const roomOccupied = filterRoom(roomArray, startDate, endDate);

    const allRoomOccupied = roomOccupied.map((room) => room.room).flat();

    const roomEmpty = allRoomNumbers.filter(
      (element) => !allRoomOccupied.includes(element)
    );
    res.json(roomEmpty);
  } catch (error) {
    console.log(error);
  }
};
exports.getTransaction = async (req, res, next) => {
  try {
    const results = await Transactions.find({ userId: req.body.id })
      .sort({ updateAt: -1 })
      .populate("hotel", "name")
      .exec();
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
