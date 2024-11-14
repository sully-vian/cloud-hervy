# Architecture plan

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
- render home.ejs with metadata
- home.ejs

client side:

- render home
- fetch "/metadata"

## Metadata route

```plaintext
           "/metadata"
       <------------------
Server                     Client
       ------------------>
       - metadata object
```

server side:

- read metadata
- send metadata

client side:

- store metadata

## Upload route

```plaintext
               "/upload" (+ file)
       <---------------------------------
Server                                    Client
       --------------------------------->
       - rendered _file-preview-list.ejs
       - updated metadata
```

server side:

- save file
- update metadata
- render _file-preview-list.ejs
- send metadata & _file-preview-list.ejs

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
        - rendered _file-preview-list.ejs
        - updated metadata
```

server side:

- delete file
- update metadata
- render _file-preview-list.ejs
- send metadata & _file-preview-list.ejs

client side:

- replace file-preview-list
- replace metadata
