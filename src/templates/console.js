import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import {Wrapper, Image} from "./templateStyles/consoleStyles";



const ConsoleTemplate = (
    {data:
        {wpcontent:
            {console:
                {console, 
                    manufacturers:
                    {edges: manufacturers}
                }
            }
        }
    }
    ) =>{
        
        const image1 = console.image1;
        const image2 = console.image2;
        const image3 = console.image3
        const pictures = [image1, image2, image3]


    return (
    <Layout>
        <SEO title = "Console"/>
        <Wrapper>
        <div className="console-container">
            <div className="console-image">
            <Image fluid={console.image1.imageFile.childImageSharp.fluid} alt={console.image1.altText} />
            <div className="manufacturers">
                {manufacturers.map(({node: manufacturer})=>(
                    <div key={manufacturer.name} className="manufacturer">{manufacturer.name}</div>
                ))}
            </div>
            </div>
            <div className="console-info">
                <h2>{console.consoleName} ({console.releaseYear})</h2>
                <h3>{manufacturers.map(({node: manufacturer})=>(
                    manufacturer.name
                ))}</h3>
                <p className="description">{console.shortDescription}</p>
                <p className="description">
                    <strong>Releaseyear: {console.releaseYear}</strong>
                </p>
                <p className="description">Notable games are {console.notableGames}</p>
            </div>
        </div>
        <div className="console-pictures">
{pictures.map((picture,i) =>(
    <div key={i} className = "console-picture"> 
    <Image
    fluid={picture.imageFile.childImageSharp.fluid}
    alt={picture.altText}
    
    />
    </div>
))}
        </div>


        </Wrapper>

    </Layout>)}

export default ConsoleTemplate

export const pageQuery = graphql`
 query($id: ID!) {
    wpcontent {
      console(id: $id, idType: ID) {
        manufacturers {
          edges {
            node {
              name
            }
          }
        }
        console {
            consoleName
            releaseYear
            shortDescription
            notableGames
            image1 {
            sourceUrl
              altText,
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            image2 {
            sourceUrl
              altText,
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }            
            image3 {
            sourceUrl
              altText,
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }  
          }
      }
    }
 }
`