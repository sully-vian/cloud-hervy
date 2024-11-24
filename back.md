# Global and interactive architecture

## Main route

```plaintext
               "/"
       <------------------
Server                     Client
       ------------------>
       - rendered home.ejs
```

server side:

- read metadata
- render home.ejs with `metadata={}` and `loading=true`
- home.ejs

client side:

- render home
- fetch "/reload"

## Upload route

```plaintext
               "/upload" (+ file)
       <---------------------------------
Server                                    Client
       --------------------------------->
       - rendered _file-previews-list.ejs
       - updated metadata
```

server side:

- save file
- update metadata
- render _file-previews-list.ejs
- send metadata & _file-previews-list.ejs

client side:

- replace file-preview-list
- replace metadata

## Download route

```plaintext
        "/download/:fileName"
       <---------------------
Server                        Client
       --------------------->
       - file
```

server side:

- send file

client side:

- download file

## Delete route

```plaintext
         "/delete/:fileName"
       <---------------------
Server                       Client
       -------------------->
        - rendered _file-previews-list.ejs
        - updated metadata
```

server side:

- delete file
- update metadata
- render _file-previews-list.ejs
- send metadata & _file-previews-list.ejs

client side:

- replace file-preview-list
- replace metadata

## Reload route

```plaintext
               "/reload"
       <------------------
Server                     Client
       ------------------>
       - rendered _file-previews-list.ejs
       - metadata
```

server side:

- read metadata
- render _file-previews-list.ejs
- send metadata & _file-previews-list.ejs

client side:

- replace file-preview-list
- replace metadata
