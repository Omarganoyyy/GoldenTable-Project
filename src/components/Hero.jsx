import { Link } from "react-router-dom"

export function Hero({HeroRef})
{

    return(
    
        <div ref={HeroRef} className="hero">

                <div className="left-side">
                    <p>
                        Choose
                        <br />
                        Your
                        <br />
                        Perfect Table.
                    </p>
                </div>


                <div className="center">

                    <div className="buttons">
                        <Link to='/restaurants'>Reserve Now</Link>
                        <Link to='/restaurants'>Explore Restaurants</Link>
                    </div>


                    <div className="table">
                        <img src={`${import.meta.env.BASE_URL}table-png.png`} alt="Table" />
                    </div>

                </div>


                <div className="right-side">
                    <p>
                        Where 
                        <br />
                        Every
                        <br/>
                        Seat Matters
                    </p>
                </div>

            </div>
    
    )
}
