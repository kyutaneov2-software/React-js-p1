const products = [
    {
        id: 1,
        name: "Nebula X1 Wireless Headphones",
        price: 3499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
        description:
            "Premium wireless headphones built for immersive audio, clean bass, and a sleek futuristic setup.",
    },
    {
        id: 2,
        name: "AeroType Wireless Keyboard",
        price: 4299,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop",
        description:
            "A clean wireless keyboard designed for fast typing, gaming, and premium desk setups.",
    },
    {
        id: 3,
        name: "PulseCore Gaming Mouse",
        price: 1899,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop",
        description:
            "High-precision gaming mouse with smooth control, responsive clicks, and a comfortable grip.",
    },
    {
        id: 4,
        name: "Vision Pro EV",
        price: 2999,
        image: "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?w=600&auto=format&fit=crop",
        description:
            "A premium visual device made for sharp video quality, modern setups, and professional streaming.",
    },
    {
        id: 5,
        name: "TitanDock Premium setup",
        price: 2499,
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&auto=format&fit=crop",
        description:
            "A premium desktop setup accessory built to organize your workspace and complete your tech station.",
    },
    {
        id: 6,
        name: "VoltEdge Power Bank",
        price: 2199,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop",
        description:
            "A high-capacity portable power bank made for fast charging phones, tablets, and daily tech gear.",
    },
    {
        id: 7,
        name: "EchoSphere Bluetooth Speaker",
        price: 2799,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop",
        description:
            "A compact Bluetooth speaker with strong sound, modern design, and reliable wireless playback.",
    },
    {
        id: 8,
        name: "NovaFit Smart Watch",
        price: 3999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
        description:
            "A modern smart watch for fitness tracking, notifications, daily activity, and minimalist style.",
    },
    {
        id: 9,
        name: "HyperCool Wireless mouse",
        price: 1599,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop",
        description:
            "A smooth wireless mouse made for clean desk setups, everyday productivity, and comfortable control.",
    },
    {
        id: 10,
        name: "LumaStrip Figures",
        price: 1999,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop",
        description:
            "Premium tech-inspired desk figures made to decorate gaming rooms, workspaces, and display shelves.",
    },
];

export function getProducts() {
    return products;
}
export function getProductsById(id) {
    return products.find((p) => p.id === Number(id));
}
