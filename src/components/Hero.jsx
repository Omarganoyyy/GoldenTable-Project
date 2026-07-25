import { Link } from "react-router-dom"

export function Hero()
{

    return(
    
        <div className="hero">

                <div className="left-side">
                    <p>
                        See It.
                        <br />
                        Choose It.
                        <br />
                        Reserve It.
                    </p>
                </div>


                <div className="center">

                    <div className="buttons">
                        <Link to='/restaurants'>Reserve Now</Link>
                        <Link to='/restaurants'>Explore Restaurants</Link>
                    </div>


                    <div className="table">
                        <img src="/table-png.png" alt="Table" />
                    </div>

                </div>


                <div className="right-side">
                    <p>
                        Your Table.
                        <br />
                        Your Experience.
                    </p>
                </div>

            </div>
    
    )
}