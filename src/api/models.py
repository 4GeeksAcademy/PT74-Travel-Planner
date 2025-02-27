from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.model):
    _tablename_ = 'user'
    id = db.column(db.integer, primary_key=True)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email = db.column(db.string(250), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    favorites = db.relationship('Favorites', backref='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
        }



class Friend(db.model):
    _tablename_ = 'friend'
    id = db.column(db.integer, primary_key=True)
    email = db.column(db.string(250), nullable=False, unique=True)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
        }


class Destination(db.model):
    _tablename_ = 'destination' 
    id = db.column(db.integer, primary_key=True)

    def serialize(self):
        return {
            "id": self.id,
        }    


class Itinerary(db.model):
    _tablename_='Itinerary'
    id = db.column(db.integer, primary_key=True)
    date = db.column(db.string(250) nullable=False)
    time = db.column(db.string(250) nullable=False)
    event = db.column(db.string(250) nullable=False)
    description = db.column(db.string(250) nullable=False)
    

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "time": self.time,
            "event": self.event,
            "details": self.details,-
            



class Expenses(db.model):
    _tablename_='expenses'
    id = db.column(db.integer, primary_key=True)
    buyer = db.column(db.string(250) nullable=False)
    expense = db.column(db.string(250) nullable=False)
    split = db.column(db.string(250) nullable=False)
    description = db.column(db.string(250) nullable=False)
    date = db.column(db.string(250) nullable=False)
    
    def serialize(self):
    return {
        "id": self.id,
        "buyer": self.buyer,
        "expense": self.expense,
        "split": self.split,
        "description": self.description,
        "date": self.date,
    }



class Packing_List(db.model):
    _tablename_='packing_list'
    id = db.column(db.integer, primary_key=True)
    item = db.column(db.string(250) nullable=False)
    category = db.column(db.string(250) nullable=False)
    detination_type = db.column(db.string(250) nullable=False)

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