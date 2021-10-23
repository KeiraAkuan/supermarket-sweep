namespace SpriteKind {
    export const Grocery = SpriteKind.create()
    export const CartItem = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Grocery, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        addToCart(otherSprite)
        pause(100)
    }
})
function createTextSprite () {
    textSprite = textsprite.create("$0")
    textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite.setPosition(0, 0)
    textSprite.left = 0
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile10`, function (sprite, location) {
	let display = " Subtotal: $" + subtotal
    game.showLongText(display, DialogLayout.Center)

    info.setScore(subtotal)
    game.over(true)
})
function addToCart (grocery: Sprite) {
    item = sprites.create(grocery.image, SpriteKind.CartItem)
    item.follow(player)
    item.x = player.x
    item.y = player.y
    cost = sprites.readDataNumber(grocery, "cost")
    subtotal += cost
    textSprite.setText("$" + subtotal)
    weight = sprites.readDataNumber(grocery, "weight")
    speed += 0 - weight
    if (speed < 50) {
        speed = 50
    }
    controller.moveSprite(player, speed, speed)
}
function createProduct (productImg: Image, cost: number, weight: number, name: string) {
    p = sprites.create(productImg, SpriteKind.Grocery)
    sprites.setDataNumber(p, "cost", cost)
    sprites.setDataNumber(p, "weight", weight)
    sprites.setDataString(p, "name", name)
    tiles.placeOnRandomTile(p, assets.tile`tile1`)
}
function createAllProducts () {
    for (let i = 0; i <= groceryImages.length - 1; i++) {
        image2 = groceryImages[i]
        name = groceryNames[i]
        cost2 = groceryCosts[i]
        weight2 = groceryWeights[i]
        createProduct(image2, cost2, weight2, name)
    }
}
let weight2 = 0
let cost2 = 0
let name = ""
let image2: Image = null
let p: Sprite = null
let weight = 0
let subtotal = 0
let cost = 0
let item: Sprite = null
let textSprite: TextSprite = null
let speed = 0
let player: Sprite = null
let groceryCosts: number[] = []
let groceryWeights: number[] = []
let groceryNames: string[] = []
let groceryImages: Image[] = []
groceryImages = [
img`
    . . . 2 2 2 . . . . . . . . . . 
    . . . c c c 6 6 8 8 . . . . . . 
    . . 6 1 1 1 1 1 9 6 8 . . . . . 
    . 6 1 1 1 1 1 1 8 9 6 8 . . . . 
    6 1 1 1 1 1 1 8 . 8 9 8 . . . . 
    6 1 1 1 1 1 1 8 . 8 9 8 . . . . 
    8 9 1 1 1 1 1 8 . 8 9 8 . . . . 
    8 9 1 1 1 1 1 8 8 9 9 8 . . . . 
    8 9 9 9 9 9 9 9 9 9 9 8 . . . . 
    8 6 9 9 9 9 9 9 9 9 9 8 . . . . 
    . 8 6 9 9 9 9 9 9 9 6 8 . . . . 
    . . 8 8 8 8 8 8 8 8 8 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . 6 6 6 . . . . . . 
    . . . . . . . c b c . . . . . . 
    . . . . . c c c b c c c . . . . 
    . . . . c b b b b b b b c . . . 
    . . . . c 1 b b b b b 1 c . . . 
    . . . . c 1 1 7 1 7 1 1 c . . . 
    . . . . c 1 1 1 7 1 1 1 c . . . 
    . . . . c 1 1 a c a 1 1 c . . . 
    . . . . c 1 a c a c a 1 c . . . 
    . . . . c 1 c a c a c 1 c . . . 
    . . . . c 1 a c a c a 1 c . . . 
    . . . . c 1 c a c a 1 1 c . . . 
    . . . . c 1 a c a 1 1 1 c . . . 
    . . . . c b 1 a 1 1 1 b c . . . 
    . . . . c b b b b b b b c . . . 
    . . . . . c c c c c c c . . . . 
    `,
img`
    . c c c c c c c c c c c c c . . 
    c b b b b b b b b b b b b b c . 
    c b b b b b b b b b b b b b c . 
    c c c c c c c c c c c c c c c . 
    c d d 1 1 1 1 1 1 1 1 1 d d c . 
    c d c c c 1 c c c 1 c c c d c . 
    c d c 1 c 1 c 1 c 1 1 c d d c . 
    c d c 1 c 1 c c c 1 1 c d d c . 
    c d c c c 1 c 1 c 1 1 c d d c . 
    c d d 1 1 1 1 1 1 1 1 1 d d c . 
    c d d 1 1 1 2 2 2 1 1 1 d d c . 
    c d d 1 1 2 8 8 8 2 1 1 d d c . 
    c d d 1 1 2 8 d 8 2 1 1 d d c . 
    c d d 1 1 2 8 6 8 2 1 1 d d c . 
    . c d 1 1 1 2 2 2 1 1 1 d c . . 
    . . c c c c c c c c c c c . . . 
    `,
img`
    . . . c c c c . . . . . . . . . 
    . . c e e e e c c c . . . . . . 
    . c e e e e e e e e c . . . . . 
    . c e e e e e e e e e c . . . . 
    f e e e e c c c e e e c . b b . 
    f e e e c e e e c c c c c d d b 
    f c e e f e e e e e e e c d d b 
    f c c c f e e e f f f f c b b b 
    f c c c c f f f c c c f . c c . 
    . f c c c c c c c c c f . . . . 
    . f c c c c c c c c f . . . . . 
    . . f f f f f f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . 6 6 9 9 9 9 . . . . . . . . 
    . 6 9 9 1 1 1 1 9 . . . . . . . 
    6 9 6 9 9 9 1 9 1 9 . . . . . . 
    6 9 9 6 6 6 6 1 1 9 . . . . . . 
    6 9 9 6 9 9 6 1 1 9 . . . . . . 
    . 6 9 6 9 9 6 1 9 . . . . . . . 
    . . 6 9 6 6 1 9 . . . . . . . . 
    . . . 6 9 9 9 . . . . . . . . . 
    . . . . 6 6 . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . c c c c c c c . . . . . 
    . . . c d d d d d d d c . . . . 
    . . c d d d d d b b d d c . . . 
    . . b c d d d d d d d c b . . . 
    . . b 2 c c c c c c c 2 b . . . 
    . . b 2 2 2 2 2 2 2 2 2 b . . . 
    . . b 2 2 2 2 2 2 2 2 2 b . . . 
    . . b 2 2 2 b b b 2 2 2 b . . . 
    . . b 2 2 b 2 2 2 b 2 2 b . . . 
    . . d 1 2 b 2 2 2 b 2 1 d . . . 
    . . d 1 1 b 2 2 2 b 1 1 d . . . 
    . . d 1 1 b 2 2 2 b 1 1 d . . . 
    . . d 1 1 1 b b b 1 1 1 d . . . 
    . . . d 1 1 1 1 1 1 1 d . . . . 
    . . . . d d d d d d d . . . . . 
    `,
img`
    . . c c c c c c c c c c . . . . 
    . c d d d d d d d c b b c . . . 
    c d d d d d d d c b d b b c . . 
    c c d d d d d d d c b b c c . . 
    c b c c c c c c c c c c b c . . 
    c b 8 9 8 b 8 9 9 9 8 b b c . . 
    c b b 8 9 6 9 6 9 6 9 8 b c . . 
    c b b 8 9 6 9 6 9 6 9 8 b c . . 
    c b 8 9 8 b 8 9 9 9 8 b b c . . 
    . c c c c c c c c c c c c . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . b 1 1 1 1 1 1 1 1 1 . . . 
    . . b 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . b 1 1 1 1 1 1 1 1 1 8 8 . . 
    . . b 1 1 1 1 1 1 1 8 8 8 8 . . 
    . . b 1 1 1 5 5 5 5 8 8 8 8 . . 
    . . b 1 1 5 5 5 5 5 5 8 8 8 . . 
    . . b 1 8 5 5 5 5 5 5 8 8 8 . . 
    . . c 8 8 5 5 5 5 5 5 8 1 1 . . 
    . . c 8 8 5 5 5 5 5 5 1 1 1 . . 
    . . c 8 8 8 5 5 5 5 1 1 1 1 . . 
    . . c 8 8 8 1 1 1 1 1 1 1 1 . . 
    . . c 2 2 2 1 1 1 1 6 6 6 1 . . 
    . . b 1 2 1 1 1 1 1 1 1 1 1 . . 
    . . b 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . . b b b b b b b b b b . . . 
    `,
img`
    . . . . . . . 6 . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    . . 6 6 6 6 7 6 7 6 6 6 6 . . . 
    . 6 6 7 6 6 7 6 7 6 6 7 7 6 . . 
    . 6 6 7 6 7 6 6 7 6 6 7 6 6 . . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 6 6 7 6 7 6 . 
    6 6 6 7 6 7 6 6 7 6 6 7 6 6 6 . 
    . 6 6 7 6 7 6 6 7 6 6 7 6 6 . . 
    . 6 6 7 6 7 7 6 7 6 6 7 6 6 . . 
    . . 6 6 6 6 7 6 7 6 6 6 6 . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    `,
assets.image`Ce`
]
groceryNames = [
"Milk",
"Grape Soda",
"Oatmeal",
"Turkey",
"Fancy Glass",
"Soup",
"Sardines",
"Flour",
"Watermelon",
"Cereal"
]
groceryWeights = [
8,
2,
1,
12,
0.5,
0.5,
0.5,
5,
10,
0.9
]
groceryCosts = [
2,
3,
4,
20,
10,
2,
1,
5,
3,
10
]
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level`)
player = sprites.create(img`
    fffffff......................
    f.fffcd......................
    ..ffddc......................
    ..fdddf......................
    ..fdddd......................
    ...55........................
    ..55dddbbbbbbbbbbbb..........
    ..555....b..b..b..b..........
    .5555....bbbbbbbbbb..........
    .5555....b..b..b..b..........
    .5555....bbbbbbbbbb..........
    .6666.....b.b..b.bb..........
    .6.66......bbbbbbb...........
    .d.d.......d.................
    .d..d......ddddddd...........
    .d..dd......c....c...........
    `, SpriteKind.Player)
speed = 100
controller.moveSprite(player, speed, speed)
scene.cameraFollowSprite(player)
tiles.placeOnTile(player, tiles.getTileLocation(0, 3))
createProduct(img`
    . . . . . . . e e e e e . . . . 
    . . . . . e e 2 2 2 2 2 e . . . 
    . . . . e e 2 2 2 2 2 2 2 e . . 
    . . . . e 9 4 2 2 2 2 2 4 b e . 
    . . e e 9 9 4 2 2 2 2 2 4 9 b e 
    . e 2 2 9 9 4 4 2 2 2 2 4 9 9 e 
    e 2 2 2 9 9 2 4 4 4 4 4 2 9 9 e 
    e 2 2 2 9 9 e e e e e e e 9 9 e 
    e 2 2 2 9 b e b b b e b e b 9 e 
    e 2 e e e e b b b b e b b e b e 
    e e 3 3 e e 2 2 2 2 e 2 2 e e e 
    e 3 3 e e e e e e e e e e e e e 
    e e e e e e e e e e e e e e e e 
    e e e e f f f e e e e f f f e e 
    . e e f b b c f e e f b b c f . 
    . . . . c f f . . . . c f f . . 
    `, 1, 1, "Toy Car")
createAllProducts()
createTextSprite()
