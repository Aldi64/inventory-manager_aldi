class InventoryManager {
  constructor() {
    this.inventory = {};
  }

  addItem(inventory, item, qty) {
    if (typeof item !== 'string' || item.trim() === '') {
      throw new Error('Item name must be a non-empty string');
    }

    if (typeof qty !== 'number' || qty <= 0 || !Number.isInteger(qty)) {
      throw new Error('Quantity must be a positive integer');
    }

    if (!inventory[item]) {
      inventory[item] = 0;
    }
    inventory[item] += qty;

    return inventory;
  }

  removeItem(inventory, item, qty) {
    if (typeof item !== 'string' || item.trim() === '') {
      throw new Error('Item name must be a non-empty string');
    }

    if (typeof qty !== 'number' || qty <= 0 || !Number.isInteger(qty)) {
      throw new Error('Quantity must be a positive integer');
    }

    if (!inventory[item]) {
      throw new Error(`Item "${item}" not found in inventory`);
    }

    if (inventory[item] < qty) {
      throw new Error(
        `Insufficient quantity of "${item}". Available: ${inventory[item]}, Requested: ${qty}`
      );
    }

    inventory[item] -= qty;

    if (inventory[item] === 0) {
      delete inventory[item];
    }

    return inventory;
  }

  getInventory() {
    return { ...this.inventory };
  }

  clearInventory() {
    this.inventory = {};
  }
}

module.exports = InventoryManager;
