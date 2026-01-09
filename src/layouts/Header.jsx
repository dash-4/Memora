const Header = () => {
    return(
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1>Memora</h1>
            <nav>
                <ul className="flex space-x-4">
                    <a href="index">Home</a>
                    <a href="index">Card</a>
                    <a href="index">Calendar</a>
                </ul>
            </nav>
        </div>
    )
}

export default Header;