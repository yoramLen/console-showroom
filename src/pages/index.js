import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Console,BottomEdgeDown, BottomEdgeUp} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homepage: {
          title,
          bannerPicture,
          homeText,
          featuredConsoles,
         
        }
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homepage {
            title
            homeText
            bannerPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            featuredConsoles {
              ... on WPGraphql_Console {
                slug
                console {
                  consoleName
                  releaseYear
                  image1 {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 50, grayscale: true) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  //console.log(data) ==> gedaan om de query te testen!
console.log(featuredConsoles)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
      <div className="banner">
      <Image
            fluid={bannerPicture.imageFile.childImageSharp.fluid}
            alt={bannerPicture.altText}
          />
          <div className="inner-div">
            <p className="header-title">{title}</p>
            <p className="header-description">{homeText}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
<div className="description">
  <p>{homeText}</p>
  <BottomEdgeUp color={COLORS.PRIMARY}/>
  </div>
  <div className="consoles">
          <h2>Featured Consoles</h2>
          <div className="console-items">
            {featuredConsoles.map(({console,slug}) =>(
              <Console key={slug} to={`/${slug}`}>
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

export default IndexPage
