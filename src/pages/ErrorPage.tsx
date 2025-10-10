function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-lg mb-8">An unexpected error has occurred. Please try again later.</p>
            {/* TODO: replace with Link component */}
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Home
            </a>
        </div>
    );
}

export default ErrorPage;
