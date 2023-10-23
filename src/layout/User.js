import "./User.css"




export default function User(props) {

    const { className, user, hLogout } = props;

    return (
        
        <div className={`${className}`}>
            <div className="user-area bg-greenish text-center fnt-w500">
                <button className="bg-red btn-logout" onClick={hLogout}>Logout</button>
                <p className="user-welcome">Welcome {user.first_name.toUpperCase()}!</p>
            </div>
        </div>
    )
}