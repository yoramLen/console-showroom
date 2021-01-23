import React from 'react'
import {useStaticQuery, graphql} from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import{
    Wrapper,
    Image,
    BottomEdgeDown,
    BottomEdgeUp,
    Console
} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"


const ConsolesPage = () =>{
  const {wpcontent:{
        page:{
            consolesPage:{
                consolespagebannerpicture,
                consolespagetext,
                title
            },
            
    },
    consoles:{edges: consoles},
}
    }
   = useStaticQuery(graphql`
    query  {
  wpcontent {
    page(id: "consoles", idType: URI) {
      consolesPage {
        consolespagebannerpicture {
            imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
              sourceUrl

            }
        consolespagetext
        consolepageTitle
      }
    }
    consoles {
      edges {
        node {
          console {
            consoleName
            releaseYear
            shortDescription
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
          slug
        }
      }
    }
  }
}

`)
console.log(consolespagetext)
    return (
    <Layout>
        <SEO title="Consoles"/>
        <Wrapper consolesColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
            <div className="banner">
                <Image 
                fluid={consolespagebannerpicture.imageFile.childImageSharp.fluid}
                alt={consolespagebannerpicture.altText}
                />
                <BottomEdgeDown color={COLORS.SECONDARY}/>
            </div>
            <div className="description">
                <h2>Welkom in de digitale console showroom</h2>
  <p>{consolespagetext}</p>
  <BottomEdgeUp color={COLORS.BLACK}/>
  </div>
  <div className="consoles">
          <h2>Onze consoles</h2>
          <div className="console-items">
            {consoles.map(({ node: { console, slug } }) => (
              <Console to={`/${slug}`} key={slug}>
                <Image
                  fluid={console.image1.imageFile.childImageSharp.fluid}
                  alt={console.image1.altText}
                />
                <div className="console-info">
                <p>
                    {console.consoleName}
                  </p>
                  <p>
                    {console.releaseYear}
                  </p>
                </div>
              </Console>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
)
}

export default ConsolesPage