const InventoryManager = require('./main');

describe('Inventory Manager Tests', () => {
  let inventoryManager;

  beforeEach(() => {
    inventoryManager = new InventoryManager();
    inventoryManager.clearInventory();
  });

  // ===== VALID TESTS (Expected to Pass) =====

  test('VALID: Add 3 apples to empty inventory', () => {
    const inventory = inventoryManager.getInventory();
    const result = inventoryManager.addItem(inventory, 'apples', 3);
    expect(result.apples).toBe(3);
  });

  test('VALID: Add multiple items and remove some', () => {
    let inventory = inventoryManager.getInventory();
    inventory = inventoryManager.addItem(inventory, 'bananas', 10);
    inventory = inventoryManager.addItem(inventory, 'oranges', 5);
    inventory = inventoryManager.removeItem(inventory, 'bananas', 3);

    expect(inventory.bananas).toBe(7);
    expect(inventory.oranges).toBe(5);
  });

  // ===== INVALID TESTS (Handles wrong input properly) =====

  test('INVALID: Remove 5 apples from empty inventory', () => {
    const inventory = inventoryManager.getInventory();
    expect(() => {
      inventoryManager.removeItem(inventory, 'apples', 5);
    }).toThrow('Item "apples" not found in inventory');
  });

  test('INVALID: Add item with negative quantity', () => {
    const inventory = inventoryManager.getInventory();
    expect(() => {
      inventoryManager.addItem(inventory, 'apples', -5);
    }).toThrow('Quantity must be a positive integer');
  });

  // ===== INTENTIONAL BREAK TEST (Fails on purpose) =====

  //   test('INTENTIONAL BREAK: Expect incorrect inventory count', () => {
  //     const inventory = inventoryManager.getInventory();
  //     const result = inventoryManager.addItem(inventory, 'grapes', 5);
  //     // INTENTIONAL FAILURE: Expecting 10 but actually added 5
  //     expect(result.grapes).toBe(10); // This will fail on purpose
  //   });

  // Additional edge case tests
  test('INVALID: Add item with empty name', () => {
    const inventory = inventoryManager.getInventory();
    expect(() => {
      inventoryManager.addItem(inventory, '', 5);
    }).toThrow('Item name must be a non-empty string');
  });

  test('VALID: Remove all items of a type', () => {
    let inventory = inventoryManager.getInventory();
    inventory = inventoryManager.addItem(inventory, 'pears', 5);
    inventory = inventoryManager.removeItem(inventory, 'pears', 5);
    expect(inventory.pears).toBeUndefined();
  });
});
