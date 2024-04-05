//
// export const cards = [
//     {
//        img: {
//            default: new URL('./assets/image/card/nft.png', import.meta.url),
//            webp: new URL('./assets/image/card/nft.webp', import.meta.url)
//        },
//         name: 'WFH - art name',
//         sold: '1.5M',
//         ending: '05h 02m 41s',
//         user: {
//             user: 'User Name1',
//             userName: 'username1',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user1.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user1.webp', import.meta.url)
//             }
//         }
//
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft2.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft2.webp', import.meta.url)
//         },
//         name: 'WFH - art name2',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name2',
//             userName: 'username2',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user2.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user2.webp', import.meta.url)
//             }
//         }
//
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft3.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft3.webp', import.meta.url)
//         },
//         name: 'WFH - art name3',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name3',
//             userName: 'username3',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user3.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user3.webp', import.meta.url)
//             }
//         }
//
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft4.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft4.webp', import.meta.url)
//         },
//         name: 'WFH - art name4',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name4',
//             userName: 'username4',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user4.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user4.webp', import.meta.url)
//             }
//         }
//
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft5.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft5.webp', import.meta.url)
//         },
//         name: 'WFH - art name5',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name5',
//             userName: 'username5',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user5.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user5.webp', import.meta.url)
//             }
//         }
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft6.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft6.webp', import.meta.url)
//         },
//         name: 'WFH - art name6',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name6',
//             userName: 'username6',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user6.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user6.webp', import.meta.url)
//             }
//         }
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft7.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft7.webp', import.meta.url)
//         },
//         name: 'WFH - art name7',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name7',
//             userName: 'username7',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user7.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user7.webp', import.meta.url)
//             }
//         }
//     },
//     {
//         img: {
//             default: new URL('./assets/image/card/nft8.png', import.meta.url),
//             webp: new URL('./assets/image/card/nft8.webp', import.meta.url)
//         },
//         name: 'WFH - art name8',
//         sold: '1.6M',
//         ending: '06h 02m 41s',
//         user: {
//             user: 'User Name8',
//             userName: 'username8',
//             sales: '24 sales on 32ETH',
//             img: {
//                 default: new URL('./assets/image/users/user8.png', import.meta.url),
//                 webp: new URL('./assets/image/users/user8.webp', import.meta.url)
//             }
//         }
//     },
// ]


export const users = [
    {
        id: 0,
        user: 'User Name1',
        userName: 'username1',
        sales: '24 sales on 32ETH',
        img: {
            default: new URL('./assets/image/users/user1.png', import.meta.url),
            webp: new URL('./assets/image/users/user1.webp', import.meta.url)
        }
    }
]

export const cards = [
    {
        id: 0,
        img: {
            default: new URL('./assets/image/card/nft.png', import.meta.url),
            webp: new URL('./assets/image/card/nft.webp', import.meta.url)
        },
        name: 'WFH - art name',
        sold: '1.5M',
        ending: '05h 02m 41s',
        description: 'The iconic meme that became a viral Internet sensation and an indispensable part of the gachimuchi music genre. This was taken when I was very young and in my full "performance" attire. That part of me now "lives" on platforms like Twitch, YouTube, and Bilibili (B 站).',
        userId: 0,
        price: 0.3,

    },
    {
        id: 1,
        img: {
            default: new URL('./assets/image/card/nft2.png', import.meta.url),
            webp: new URL('./assets/image/card/nft2.webp', import.meta.url)
        },
        name: 'WFH - art name2',
        sold: '1.5M',
        ending: '05h 02m 41s',
        description: 'The iconic meme that became a viral Internet sensation and an indispensable part of the gachimuchi music genre. This was taken when I was very young and in my full "performance" attire. That part of me now "lives" on platforms like Twitch, YouTube, and Bilibili (B 站).',
        userId: 0,
        price: 0.3,

    },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft2.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft2.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name2',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name2',
    //         userName: 'username2',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user2.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user2.webp', import.meta.url)
    //         }
    //     }
    //
    // },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft3.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft3.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name3',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name3',
    //         userName: 'username3',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user3.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user3.webp', import.meta.url)
    //         }
    //     }
    //
    // },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft4.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft4.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name4',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name4',
    //         userName: 'username4',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user4.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user4.webp', import.meta.url)
    //         }
    //     }
    //
    // },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft5.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft5.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name5',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name5',
    //         userName: 'username5',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user5.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user5.webp', import.meta.url)
    //         }
    //     }
    // },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft6.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft6.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name6',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name6',
    //         userName: 'username6',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user6.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user6.webp', import.meta.url)
    //         }
    //     }
    // },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft7.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft7.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name7',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name7',
    //         userName: 'username7',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user7.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user7.webp', import.meta.url)
    //         }
    //     }
    // },
    // {
    //     img: {
    //         default: new URL('./assets/image/card/nft8.png', import.meta.url),
    //         webp: new URL('./assets/image/card/nft8.webp', import.meta.url)
    //     },
    //     name: 'WFH - art name8',
    //     sold: '1.6M',
    //     ending: '06h 02m 41s',
    //     user: {
    //         user: 'User Name8',
    //         userName: 'username8',
    //         sales: '24 sales on 32ETH',
    //         img: {
    //             default: new URL('./assets/image/users/user8.png', import.meta.url),
    //             webp: new URL('./assets/image/users/user8.webp', import.meta.url)
    //         }
    //     }
    // },
]


