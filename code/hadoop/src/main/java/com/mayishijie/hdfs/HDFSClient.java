package com.mayishijie.hdfs;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IOUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.net.URI;

/**
 * @author tty
 * @version 1.0 2021-07-31 18:31
 */
public class HDFSClient {
    FileSystem fileSystem;

    /**
     * 上传
     * @throws IOException
     * @throws InterruptedException
     */
    @Test
    public void put() throws IOException, InterruptedException {
        Configuration configuration = new Configuration();
        configuration.set("dfs.replication", "2");
        configuration.set("dfs.blocksize", "67108864");


        //1. 新建HDFS对象
        FileSystem fileSystem = FileSystem.get(URI.create("hdfs://hadoop102:8020"),
                configuration, "atguigu");


        //2. 操作集群
        fileSystem.copyFromLocalFile(
                new Path("D:\\Atguigu\\302_尚硅谷大数据技术之hadoop\\2.资料\\01_jar包\\hadoop-3.1.3.tar.gz"),
                new Path("/1.tar.gz"));

        //3. 关闭资源
        fileSystem.close();
    }

    @Before
    public void before() throws IOException, InterruptedException {
        //1. 新建HDFS对象
        fileSystem = FileSystem.get(URI.create("hdfs://hadoop102:8020"),
                new Configuration(), "atguigu");
    }

    @After
    public void after() throws IOException {
        fileSystem.close();
    }

    /**
     * 下载
     *
     */
    @Test
    public void get() throws IOException {
        fileSystem.copyToLocalFile(
                new Path("/1.tar.gz"),
                new Path("d:/")
        );
    }

    /**
     * 追加
     */
    @Test
    public void append() throws IOException {

        FSDataOutputStream append = fileSystem.append(
                new Path("/README.txt")
        );

        append.write("TestAPI".getBytes());

        IOUtils.closeStream(append);
    }

    /**
     * 查看文件和文件夹
     * @throws IOException
     */
    @Test
    public void ls() throws IOException {
        FileStatus[] fileStatuses = fileSystem.listStatus(new Path("/"));
        for (FileStatus fileStatus : fileStatuses) {
            System.out.println(fileStatus.getPath());
            System.out.println(fileStatus.getOwner());
            System.out.println("=================");
        }
    }

    /**
     * 查看文件
     * @throws IOException
     */
    @Test
    public void lf() throws IOException {
        RemoteIterator<LocatedFileStatus> statusRemoteIterator =
                fileSystem.listFiles(new Path("/"), true);
        while (statusRemoteIterator.hasNext()) {
            LocatedFileStatus fileStatus = statusRemoteIterator.next();

            System.out.println(fileStatus.getPath());
            BlockLocation[] blockLocations = fileStatus.getBlockLocations();
            for (int i = 0; i < blockLocations.length; i++) {
                System.out.println("第" + i + "块");
                String[] hosts = blockLocations[i].getHosts();
                for (String host : hosts) {
                    System.out.print(host + " ");
                }
                System.out.println();
            }

            System.out.println("===================================");

        }
    }


    /**
     * 移动
     */
    @Test
    public void mv() throws IOException {
        fileSystem.rename(new Path("/1.tar.gz"),
                new Path("/logs/2.tar.gz"));
    }
}
