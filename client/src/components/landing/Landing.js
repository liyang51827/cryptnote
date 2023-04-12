import * as React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Container,
  Typography,
  Button,
  Box,
  Link,
  Grid,
} from '@mui/material';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import slide_1 from '../../assets/images/slide_2.jpg';
import slide_2 from '../../assets/images/slide_1.jpg';

const tiers = [
  {
    title: 'Message',
    description: [
      'encryption MESSAGE service',
      'totaly free',
    ],
    buttonText: 'Message service',
    buttonVariant: 'contained',
    href: '/message'
  },
  {
    title: 'File',
    description: [
      'encryption FILE service',
      'totaly free',
    ],
    buttonText: 'File service',
    buttonVariant: 'contained',
    href: '/file'
  },
  {
    title: 'Payment',
    description: [
      'for more Functions',
      'please use',
    ],
    buttonText: 'Payment',
    buttonVariant: 'contained',
    href: '/payment'
  },
];


const Landing = () => {
  return (
    <React.Fragment>
      <Header />
      <Box className='landing'>
        <Box
          sx={{
            mt: 8,
            mx: 'auto',
            maxWidth: 'md'
          }}
        >
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '42px', mt: 10 }}
          >
            Secure way to share notes and files
          </Typography>
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '20px', mt: 1 }}
          >
            Encrypt and send files and notes with a link that automatically destruct
            after being read. <br /><Link href='/'>CryptNote</Link> is a free web-based service that allows you to
            share a note or a file with confidentiality.
            There is no way to spying on you even to a hacker.
          </Typography>
          <Box sx={{padding: '22px'}}>
            <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
              <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
              <div className="carousel-inner relative w-full overflow-hidden">
                <div className="carousel-item active relative float-left w-full">
                  <img
                    src={slide_1}
                    className="block w-full slide-image"
                    alt="..."
                  />
                  <div className="carousel-caption hidden md:block absolute text-center">
                    <h3 className="text-xl slide-caption-big">Free Encrypt Service</h3>
                  </div>
                </div>
                <div className="carousel-item relative float-left w-full">
                  <img
                    src={slide_2}
                    className="block w-full slide-image"
                    alt="..."
                  />
                  <div className="carousel-caption hidden md:block absolute text-center">
                    <h5 className="text-xl slide-caption-big">Free Encrypt Service</h5>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Box>
          {/*  */}

          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid
                  item
                  key={tier.title}
                  xs={12}
                  sm={tier.title === 'Enterprise' ? 12 : 6}
                  md={4}
                >
                  <Card>
                    <CardContent>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant={tier.buttonVariant} href={tier.href} className='landing-option-btn rounded-border-more'>
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '36px', mt: 10 }}
          >
            Use CryptNote whenever you share your personal and sensitive information via the internet
          </Typography>
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '16px', mt: 1 }}
          >
            <Link href='/'>CryptNote</Link> is the free, fast, and secure way to share files and
            notes with end-to-end encryption and a link that expires automatically. 
            And also it's a free cloud-based service that is functioning via an encrypted SSL tunnel.
            <Link href='/'>CryptNote</Link> doesn't require you to create an account before start using the service and
            no password or email required. This free service enables you to send a self-destructing message or
            file to someone. This means once they view the message or download the file, they will no longer
            be able to access it again after the view count has reached zero. This ensures your message is read
            by no one but the reader and all evidence of the message is erased.
            Messages are also anonymous unless you add any identifiable information to your message.
            If you share your passwords or private, sensitive data via email or chat, copies of that
            data are stored in a number of locations. If you use <Link href='/'>CryptNote</Link> instead, the data stays
            for a single viewing, which ensures that someone else can't read it later.
            It allows you to send sensitive information in a secure manner, ensuring that only one person can see it.
          </Typography>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

export default Landing;