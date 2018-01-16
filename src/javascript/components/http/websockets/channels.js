/**
 * These are the channels all users listen to.
 */

export default {
  'private-info': [
    {'event': 'CurrencyUpdated'},
  ],
  'info': [
    {'event': 'UserOnline'},
    {'event': 'StaffOnline'},
  ],
  'private-notification': [
    {'event': 'UserAlert'},
    {'event': 'RoomAlert'},
    {'event': 'StaffAlert'},
  ],
  'auction': [
    {'event': 'NewBid'},
    {'event': 'ItemSold'},
    {'event': 'newItem'},
  ]
};