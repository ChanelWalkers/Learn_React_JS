const MyComponent = () => {
    const myInformation = {
        name: "Tien Dat",
        age: "22",
    }

    return (
        <>
            <div>Hello, I'm {JSON.stringify(myInformation)}</div>
            <div className="child">JSX</div>
        </>
    );
}

export default MyComponent;