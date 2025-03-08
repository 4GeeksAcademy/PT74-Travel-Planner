from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(250), nullable=False, unique=True)
    _password = db.Column(db.String(250), nullable=False)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

    @hybrid_property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self._password, password)

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
        }

class Friend(db.Model):
    __tablename__ = 'friend'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False, unique=True)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
        }

class Destination(db.Model):
    __tablename__ = 'destination' 
    id = db.Column(db.Integer, primary_key=True)

    def serialize(self):
        return {
            "id": self.id,
        }    

class Itinerary(db.Model):
    __tablename__ = 'itinerary'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(250), nullable=False)
    time = db.Column(db.String(250), nullable=False)
    event = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(250), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "time": self.time,
            "event": self.event,
            "description": self.description,
        }

class Expenses(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    buyer = db.Column(db.String(250), nullable=False)
    expense = db.Column(db.String(250), nullable=False)
    split = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    date = db.Column(db.String(250), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "buyer": self.buyer,
            "expense": self.expense,
            "split": self.split,
            "description": self.description,
            "date": self.date,
        }

class PackingList(db.Model):
    __tablename__ = 'packing_list'
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(250), nullable=False)
    category = db.Column(db.String(250), nullable=False)
    destination_type = db.Column(db.String(250), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "item": self.item,
            "category": self.category,
            "destination_type": self.destination_type,
        }



# class User(db.Model):
#     id: Mapped[int] = mapped_column(primary_key=True)
#     email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
#     password: Mapped[str] = mapped_column(nullable=False)
#     is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             # do not serialize the password, its a security breach
#         }