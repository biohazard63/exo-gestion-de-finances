import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

export function NavigationMenuDemo() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication status
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Logout successful');
            localStorage.removeItem('token'); // Clear token from local storage
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed', error.response || error);
        }
    };

    const menuItems = [
        {
            title: "Accueil",
            href: "/",
            description: "Return to the home page.",
        },
        // Include Gestion link conditionally based on authentication
        ...(isAuthenticated ? [{
            title: "Gestion",
            href: "/gestion",
            description: "Manage your account settings.",
        }] : [])
    ];

    return (
        <div className="flex justify-between items-center m-2">
            <NavigationMenu>
                <NavigationMenuList>
                    {menuItems.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                                    <ListItem href={item.href} title={item.title}>
                                        {item.description}
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                    {!isAuthenticated && (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Login</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                                        <ListItem href="/login" title="Login">
                                            "Access your account."
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Signup</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                                        <ListItem href="/signup" title="Signup">
                                            "Create a new account."
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </>
                    )}
                    {isAuthenticated && (
                        <NavigationMenuItem>
                            <button onClick={handleLogout} className="block text-sm font-medium">Logout</button>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
            {isAuthenticated && (
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

const ListItem = React.forwardRef(({ href, title, children }, ref) => (
    <li>
        <Link to={href} ref={ref} className="block text-sm font-medium">
            {children}
        </Link>
    </li>
));
ListItem.displayName = "ListItem";