// Inventory Manager Functions

class InventoryManager {
  constructor() {
    this.inventory = {};
  }

  /**
   * Add item to inventory
   * @param {Object} inventory - Current inventory object
   * @param {string} item - Item name to add
   * @param {number} qty - Quantity to add
   * @returns {Object} Updated inventory
   */
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

  /**
   * Remove item from inventory
   * @param {Object} inventory - Current inventory object
   * @param {string} item - Item name to remove
   * @param {number} qty - Quantity to remove
   * @returns {Object} Updated inventory
   */
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

    // Remove item if quantity becomes zero
    if (inventory[item] === 0) {
      delete inventory[item];
    }

    return inventory;
  }

  /**
   * Get current inventory
   * @returns {Object} Current inventory
   */
  getInventory() {
    return { ...this.inventory };
  }

  /**
   * Clear inventory
   */
  clearInventory() {
    this.inventory = {};
  }
}

module.exports = InventoryManager;
