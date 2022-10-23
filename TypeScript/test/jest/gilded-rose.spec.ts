import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("Quality degrades twice as fast after sellin <=0", () => {
  it("should have qualitiy of 0 for any good after sell=0", () => {
    const gildedRose = new GildedRose([new Item("product1", 0, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("product1");
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(98);
  });
  it("should have qualitiy of 2 for Aged Brie after sellin=0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(100);
  });
  it("should have qualitiy of 0 for Sulfuras, Hand of Ragnaros after sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 100),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(100);
  });
  it("should have qualitiy of 0 for Backstage after sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 100),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });
});

describe("Negative checks", () => {
  describe("Quality of an item is never negative", () => {
    it("should not have negative quialitiy for any good", () => {
      const gildedRose = new GildedRose([new Item("product1", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("product1");
      expect(items[0].sellIn).toBeGreaterThanOrEqual(-1);
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    });
    it("should not decrease quality even if we set to -1", () => {
      const gildedRose = new GildedRose([new Item("product1", 0, -1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("product1");
      expect(items[0].sellIn).toBeGreaterThanOrEqual(-1);
      expect(items[0].quality).toBeGreaterThanOrEqual(-1);
    });
    it("should not have negative quialitiy for Aged Brie", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].sellIn).toBeGreaterThanOrEqual(-1);
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    });
    it("should not have negative quialitiy for Sulfuras, Hand of Ragnaros", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 0, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toBeGreaterThanOrEqual(-1);
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    });
    it("should not have negative quialitiy for Backstage", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toBeGreaterThanOrEqual(-1);
      expect(items[0].quality).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Quality of an item is never negative, check quality and sellin values", () => {
    it("should have qualitiy of 0 for any good after sell=0", () => {
      const gildedRose = new GildedRose([new Item("product1", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("product1");
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
    it("should have qualitiy of 2 for Aged Brie after sellin=0", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(2);
    });
    it("should have qualitiy of 0 for Sulfuras, Hand of Ragnaros after sellin=0", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 0, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toEqual(0);
      expect(items[0].quality).toEqual(0);
    });
    it("should have qualitiy of 0 for Backstage after sellin=0", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });
});

describe("The Quality of an item is never more than 50", () => {
  it("should have qualitiy of 59 for any good after sell=10 en quality exceeds 50", () => {
    const gildedRose = new GildedRose([new Item("product1", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("product1");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(49);
  });
  it("should have qualitiy of 2 for Aged Brie after sellin=0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(50);
  });
  it("should have qualitiy of 0 for Sulfuras, Hand of Ragnaros after sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toEqual(10);
    expect(items[0].quality).toEqual(50);
  });
  it("should have qualitiy of 0 for Backstage after sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(50);
  });
});

describe("Quality of an item is never more than 50?", () => {
  it("should have qualitiy of 59 for any good after sell=10 en quality exceeds 50", () => {
    const gildedRose = new GildedRose([new Item("product1", 10, 60)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("product1");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(59);
  });
  it("should have qualitiy of 2 for Aged Brie after sellin=0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 60)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(60);
  });
  it("should have qualitiy of 0 for Sulfuras, Hand of Ragnaros after sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 60),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toEqual(10);
    expect(items[0].quality).toEqual(60);
  });
  it("should have qualitiy of 0 for Backstage after sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 60),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(60);
  });
});

describe("Aged brie cases", () => {
  it("should increase its quality every day in 1", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(31);
  });

  it("should increase its quality every day in 2 on sellin=0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 31)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(33);
  });

  it("should increase its quality every day in 2 after sellin=0", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -1, 33)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toEqual(-2);
    expect(items[0].quality).toEqual(35);
  });
});

describe("Sulfuras, Hand of Ragnaros cases", () => {
  it("should never has to be sold or decreases in Quality before sellin=0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 1, 30),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(30);
  });
  it("should never has to be sold or decreases in Quality before sellin>0", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 30),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(30);
  });
});

describe("Backstage passes to a TAFKAL80ETC concert cases", () => {
  it("should increase by 1, when more than 10 days left for the concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 30),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(11);
    expect(items[0].quality).toEqual(31);
  });

  it("should increase by 2, when 10 days or less left for the concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 29),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(31);
  });

  it("should increase by 3, when 5 days or less left for the concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 29),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(4);
    expect(items[0].quality).toEqual(32);
  });

  it("should have quality = 0 when sellin<=0", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 29),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });
});
