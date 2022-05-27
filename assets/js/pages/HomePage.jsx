import React from "react";
import AuthAPI from "../services/authAPI";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function Index() {
  return (
    <>
      <div className="main-content">
        <section className="py-6 pb-9 bg-default">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="6">
                <h2 className="display-3 text-white">
                  A complete React solution
                </h2>
                <p className="lead text-white">
                  
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-lg-0 mt--7">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h4 className="h3 text-info text-uppercase">
                          Based on React and Reactstrap
                        </h4>
                      
                        <div>
                          <Badge color="info" pill>
                            react
                          </Badge>
                          <Badge color="info" pill>
                            reactstrap
                          </Badge>
                          <Badge color="info" pill>
                            dashboard
                          </Badge>
                          <Badge color="info" pill>
                            template
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h4 className="h3 text-success text-uppercase">
                          Integrated build tools
                        </h4>
                       
                        <div>
                          <Badge color="success" pill>
                            npm
                          </Badge>
                          <Badge color="success" pill>
                            build tools
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h4 className="h3 text-warning text-uppercase">
                          Full Sass support
                        </h4>
                       
                        <div>
                          <Badge color="warning" pill>
                            sass
                          </Badge>
                          <Badge color="warning" pill>
                            design
                          </Badge>
                          <Badge color="warning" pill>
                            customize
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">

              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-7 section-nucleo-icons bg-white overflow-hidden">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <div className="btn-wrapper">
                  <Button
                    color="info"
                    href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/icons?ref=adpr-index-page"
                    target="_blank"
                  >
                    View demo icons
                  </Button>
                  <Button
                    className="mt-3 mt-md-0"
                    color="default"
                    href="https://nucleoapp.com/?ref=1712"
                    target="_blank"
                  >
                    View all icons
                  </Button>
                </div>
              </Col>
            </Row>
            <div className="blur--hover">
                <div className="icons-container blur-item mt-5">
                  <i className="icon ni ni-diamond" />

                  <i className="icon icon-sm ni ni-album-2" />
                  <i className="icon icon-sm ni ni-app" />
                  <i className="icon icon-sm ni ni-atom" />

                  <i className="icon ni ni-bag-17" />
                  <i className="icon ni ni-bell-55" />
                  <i className="icon ni ni-credit-card" />

                  <i className="icon icon-sm ni ni-briefcase-24" />
                  <i className="icon icon-sm ni ni-building" />
                  <i className="icon icon-sm ni ni-button-play" />

                  <i className="icon ni ni-calendar-grid-58" />
                  <i className="icon ni ni-camera-compact" />
                  <i className="icon ni ni-chart-bar-32" />
                </div>
                
            </div>
            
          </Container>
        </section>
      </div>
    </>
  );
}

export default Index;
