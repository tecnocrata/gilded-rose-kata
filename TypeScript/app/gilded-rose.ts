export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      let qualityIncrease = 0;
      switch (item.name) {
        case "Aged Brie":
          item.sellIn--;
          qualityIncrease = item.sellIn < 0 ? 2 : 1;
          if (item.quality + qualityIncrease <= 50)
            item.quality = item.quality + (item.sellIn < 0 ? 2 : 1);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item.sellIn--;
          qualityIncrease = 0;
          if (item.sellIn > 10) qualityIncrease = 1;
          else if (item.sellIn > 5 && item.sellIn <= 10) qualityIncrease = 2;
          else if (item.sellIn >= 0 && item.sellIn <= 5) qualityIncrease = 3;
          else {
            item.quality = 0;
            break;
          }
          if (
            item.quality + qualityIncrease > 0 &&
            item.quality + qualityIncrease <= 50
          )
            item.quality = item.quality + qualityIncrease;
          break;
        default:
          item.sellIn--;
          qualityIncrease = -(item.sellIn < 0 ? 2 : 1);
          if (item.quality + qualityIncrease > 0)
            item.quality = item.quality + qualityIncrease;
          break;
      }
    }
    //console.log("items", this.items);
    return this.items;
  }

  updateQuality2() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
