// ignore_for_file: avoid_unnecessary_containers, prefer_const_constructors

//import 'dart:isolate';

import 'package:flutter/material.dart';

void main() {
  runApp(const TabBarDemo());
}

class TabBarDemo extends StatelessWidget {
  const TabBarDemo({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.deepOrange),
      home: DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Čo variť'),
            bottom: const TabBar(
              tabs: [
                Tab(text: 'Nájsť recept'),
                Tab(icon: Icon(Icons.settings)),
              ],
            ),
          ),
          body: TabBarView(
            children: [
              //tab1

              Container(
                child: Center(
                  child: Text('Obsah vyhladavania receptov'),
                ),
              ),

              //tab2

              Container(
                child: Nastavenia(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

//tab2

class Nastavenia extends StatefulWidget {
  const Nastavenia({super.key});

  @override
  State<Nastavenia> createState() => _NastaveniaState();
}

class _NastaveniaState extends State<Nastavenia> {
  bool isChecked = false;
  bool isChecked2 = true;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
          child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(children: [
          Text("Farebná schéma"),
          CheckboxListTile(
            value: isChecked,
            title: Text("Tmavá"),
            onChanged: (value) {
              setState(() {
                isChecked = value!;

                isChecked2 = false;
              });
            },
          ),
          CheckboxListTile(
            value: isChecked2,
            title: Text("Pôvodná"),
            onChanged: (value) {
              setState(() {
                isChecked2 = value!;

                isChecked = false;
              });
            },
          ),
          OutlinedButton(
              onPressed: () {
                ThemeData.dark();
                /* if (isChecked == true) {
                  ThemeData(scaffoldBackgroundColor: Colors.black);
                  ThemeData(primarySwatch: Colors.grey);
                } else {
                  isChecked2 = true;
                  ThemeData(primarySwatch: Colors.deepOrange);
                  ThemeData(scaffoldBackgroundColor: Colors.white);
                  
                }*/
              },
              child: const Text("Použiť")),
        ]),
      )),
    );
  }
}
