cd vm
make clean
make
cd build
source ../../activate
pintos --gdb -v -k -m 20 --fs-disk=10 -p tests/userprog/args-none:args-none --swap-disk=4 -- -q -f run args-none
# perl -I../.. ../../tests/userprog/args-none.ck tests/userprog/args-none tests/userprog/args-none.result