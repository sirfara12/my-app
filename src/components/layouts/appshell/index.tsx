import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { Roboto } from"next/font/google";
const disableNavbar = ['/auth/login', '/auth/register','404'];

type AppShellProps = {
    children: React.ReactNode;
}
const RobotoFont = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
});

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    
    return (
        <main className={RobotoFont.className}>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;