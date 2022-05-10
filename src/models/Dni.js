class Dni {
  constructor(data) {
    this.fullName = data.nombre;
    this.names = data.nombres;
    this.firstLastName = data.apellidoPaterno;
    this.secondLastName = data.apellidoMaterno;
  }

  toJson() {
    return {
      fullName: this.fullName,
      names: this.names,
      firstLastName: this.firstLastName,
      secondLastName: this.secondLastName,
    };
  }
}

module.exports = Dni;