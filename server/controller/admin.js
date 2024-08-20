const jwt = require("jsonwebtoken");
const Hotels = require("../model/hotel");
const Rooms = require("../model/room");
const Users = require("../model/user");
const Transactions = require("../model/transaction");
exports.newHotel = async (req, res, next) => {
  const hotel = new Hotels({
    name: req.body.nameEntered,
    type: req.body.typeEntered,
    city: req.body.cityEntered,
    address: req.body.addressEntered,
    distance: req.body.distanceEntered,
    photos: req.body.imageEntered,
    desc: req.body.descriptionEntered,
    title: req.body.titleEntered,
    cheapestPrice: req.body.priceEntered,
    featured: req.body.featuredEnterd,
    rooms: req.body.roomEntered,
  });

  try {
    await hotel.save();
    return res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
exports.hotelsList = async (req, res, next) => {
  try {
    return res.json(await Hotels.find());
  } catch (error) {
    console.log(error);
  }
};
exports.deleteHotel = async (req, res, next) => {
  const { id } = req.body;
  try {
    const checkHotel = await Transactions.findOne({ hotel: id });

    if (checkHotel) {
      return res.status(400).json({ message: "khach san dang duoc su dung" });
    }
    const deleteHotel = await Hotels.deleteOne({ _id: id });
    res.json(deleteHotel);
  } catch (error) {
    console.log(error);
  }
};
exports.roomsList = async (req, res, next) => {
  try {
    return res.json(await Rooms.find());
  } catch (error) {
    console.log(error);
  }
};
exports.deleteRoom = async (req, res, next) => {
  try {
    return res.json(await Rooms.deleteOne({ _id: req.body._id }));
  } catch (error) {
    console.log(error);
  }
};
exports.getNameHotel = async (req, res, next) => {
  try {
    const hotels = (await Hotels.find()).map((hotel) => hotel.title);

    res.json(hotels);
  } catch (error) {
    console.log(error);
  }
};
exports.newRoom = async (req, res, next) => {
  const room = new Rooms({
    title: req.body.titleEntered,
    price: req.body.priceEntered,
    maxPeople: req.body.maxPeopleEntered,
    desc: req.body.descriptionEntered,
    roomNumbers: req.body.numberRoomEntered.split(","),
  });
  try {
    await room.save();
    res.json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body.data;
  try {
    const user = await Users.findOne({ email, password, isAdmin: true });
    if (!user) {
      res.status(400).json({ message: "tai khoan khong hop le" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    return res.json({ message: "success", token, userId: user._id });
  } catch (error) {
    console.log(error);
  }
};
exports.getEditHotel = async (req, res, next) => {
  try {
    const results = await Hotels.findById(req.params);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

exports.editHotel = async (req, res, next) => {
  const {
    _id,
    nameEntered,
    cityEntered,
    distanceEntered,
    descriptionEntered,
    imageEntered,
    typeEntered,
    addressEntered,
    titleEntered,
    priceEntered,
    featuredEntered,
    roomEntered,
  } = req.body;
  console.log(req.body);
  try {
    await Hotels.updateOne(
      { _id: _id }, // Điều kiện tìm kiếm bản ghi cần cập nhật
      {
        name: nameEntered,
        city: cityEntered,
        distance: distanceEntered,
        desc: descriptionEntered,
        photos: imageEntered.split(","),
        type: typeEntered,
        address: addressEntered,
        title: titleEntered,
        cheapestPrice: priceEntered,
        featured: featuredEntered,
        rooms: roomEntered,
      }
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
exports.getEditRoom = async (req, res, next) => {
  try {
    res.json(await Rooms.findById(req.params));
  } catch (error) {
    console.log(error);
  }
};
exports.editRoom = async (req, res, next) => {
  const {
    _id,
    titleEntered: title,
    priceEntered: price,
    descriptionEntered: desc,
    maxPeopleEntered: maxPeople,
    numberRoomEntered,
  } = req.body;
  const roomNumbers = numberRoomEntered.split(",");
  try {
    await Rooms.updateOne(
      { _id },
      { title, price, desc, maxPeople, roomNumbers }
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
exports.roomName = async (req, res, next) => {
  try {
    const results = await Rooms.find().select("_id title");
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
exports.getTransaction = async (req, res, next) => {
  console.log(req.body);

  try {
    let results;
    if (req.body.transaction === "latest transactions") {
      console.log("latest ttttt");
      results = await Transactions.find()
        .limit(8)
        .sort({ updateAt: -1 })
        .populate("hotel", "name")
        .exec();
    } else {
      results = await Transactions.find()
        .sort({ updateAt: -1 })
        .populate("hotel", "name")
        .exec();
    }

    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
const updateTransactionStatus = async () => {
  const currentDate = new Date();

  try {
    // Cập nhật các giao dịch đã đặt (Booked)
    await Transactions.updateMany(
      {
        status: "Booked",
        startDate: { $lte: currentDate }, // Ngày bắt đầu nhỏ hơn hoặc bằng thời gian hiện tại
      },
      { $set: { status: "Checkin" } } // Cập nhật status thành 'Checkin'
    );

    // Cập nhật các giao dịch đang ở trạng thái Checkin thành Checkout
    await Transactions.updateMany(
      {
        status: "Checkin",
        endDate: { $lt: currentDate }, // Ngày kết thúc nhỏ hơn thời gian hiện tại
      },
      { $set: { status: "Checkout" } } // Cập nhật status thành 'Checkout'
    );

    console.log("Cập nhật status của giao dịch thành công.");
  } catch (error) {
    console.error("Lỗi khi cập nhật status của giao dịch:", error);
  }
};

// Gọi hàm cập nhật trạng thái mỗi khoảng thời gian (ví dụ: mỗi giờ)
setInterval(updateTransactionStatus, 3600000); // Mỗi giờ (3600000 miliseconds)

// Gọi hàm cập nhật trạng thái lần đầu tiên
updateTransactionStatus();
console.log(new Date());
