import React from "react";
import { Link } from "react-router-dom"; // Import from react-router-dom
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components = [
    {
        title: "Accueil",
        href: "/",
        description: "Return to the home page.",
    },
    {
        title: "Login",
        href: "/login",
        description: "Access your account through the login page.",
    },
    {
        title: "Signup",
        href: "/signup",
        description: "Sign up for a new account.",
    },
    {
        title: "Gestion",
        href: "/gestion",
        description: "Manage your account settings.",
    },
];

export function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {components.map((component) => (
                    <NavigationMenuItem key={component.title}>
                        <NavigationMenuTrigger>{component.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                                <ListItem href={component.href} title={component.title}>
                                    {component.description}
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef(({ className, title, href, children }, ref) => (
    <li>
        <Link to={href} ref={ref} className={`block text-sm font-medium ${className}`}>
            {children}
        </Link>
    </li>
));
ListItem.displayName = "ListItem";