import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, IconButton, Paper, styled } from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { newMessage } from '../../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { environment } from '../../../environments/environment';

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  
  const { children, onClose, ...other } = props;
  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
  
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface IProps {
  sendMessage: (message: any) => void;
}

interface IState {
  openGiphySearch: boolean;
  giphyResults: any[]
}

class NewMessageComponent extends Component<IProps, IState> {
  
  constructor(props: IProps) {
    
    super(props);
    
    this.state = {
      openGiphySearch: false,
      giphyResults: []
    };
    
  }
  
  handleClose = () => {
    
    this.setState({
      openGiphySearch: false
    });
    
  };
  
  handleSubmit = (event: any) => {
    
    event.preventDefault();
    
    const data: FormData = new FormData(event.currentTarget);
    const message: string = String(data.get('message'));
    
    event.target.reset();
    
    const giphyRegex: RegExp = new RegExp(/(\/giphy ([a-zA-Z0-9])+)/g);
    
    if (message.match(giphyRegex)) {
      
      const messageData: any[] = message.split(' ');
      const searchTerm: string = (messageData.splice(1, messageData.length) as any[]).join(' ');
      
      axios({
        method: 'get',
        url: environment.giphy.apiURL,
        params: {
          api_key: environment.giphy.token,
          q: searchTerm,
          limit: 12
        }
      }).then((response: any) => {
        
        this.setState({
          openGiphySearch: true,
          giphyResults: response.data.data
        });
        
      });
      
    } else {
      
      this.props.sendMessage({
        message,
        message_type: 'text'
      });
      
    }
    
  }
  
  sendGif = (embedUrl: string) => {
    
    this.setState({
      openGiphySearch: false,
      giphyResults: []
    });
    
    this.props.sendMessage({
      message: embedUrl,
      message_type: 'giphy'
    });
    
  }
  
  render() {
    
    return (
      <div>
        <BootstrapDialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.openGiphySearch}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Send a GIF!
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              {this.state.giphyResults.map((gif: any) => (
                <Grid item xs={4} key={gif.id} sx={{cursor: 'pointer'}} onClick={() => this.sendGif(gif.embed_url)}>
                  <Item>
                    <iframe src={gif.embed_url} title={gif.title} width="100" height="100" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </BootstrapDialog>
        <Grid container style={{padding: '20px'}} component="form" onSubmit={(event: any) => this.handleSubmit(event)} noValidate>
          <Grid item xs={11}>
            <TextField
              id="message"
              name="message"
              label="New message"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sx={{display: "flex", justifyContent: 'center'}}>
            <IconButton type="submit" aria-label="Submit">
              <Send/>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
    
  }
  
}

const mapDispatchToProps = (dispatch: any) => ({
  sendMessage: (message: any) => {
    dispatch(newMessage({
      message
    }));
  },
});

export const NewMessage = connect(() => ({}), mapDispatchToProps)(NewMessageComponent);
