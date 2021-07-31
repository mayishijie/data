#!/bin/bash

if (($#==0))
then
    exit 1;
fi
for i in hadoop102 hadoop103 hadoop104
do
    echo "=====================  Starting zk in $i  ======================="
    ssh $i "source /etc/profile && /opt/module/zookeeper-3.4.10/bin/zkServer.sh $1" 2> /dev/null
done
