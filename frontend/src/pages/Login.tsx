import { Link } from 'react-router-dom'; // Import from react-router-dom
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description = `
    A login page with two columns. The first column has the login form with email and password.
    There's a Forgot your password link and a link to sign up if you do not have an account.
    The second column has a cover image.
`;

export function LoginForm() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold">Login</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="m@example.com"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </form>
                    <p className="mt-2 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="hidden lg:block relative w-full h-full">
                <img
                    src="/login.jpg"
                    alt="Cover"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
}

export default LoginForm;